<template>
    <div class="perfectInformation">
        <h3>请完善信息</h3>
        <van-form @submit="onSubmit">
            <van-field
                    v-model="fieldValue"
                    is-link
                    label="班级"
                    placeholder="请选择所在班级"
                    @click="show = true"
            />
            <van-popup v-model="show" round position="bottom">
                <van-cascader
                        title="请选择所在班级"
                        :options="dept"
                        @close="show = false"
                        @finish="onFinish"
                        :field-names="fieldNames"
                />
            </van-popup>
            <van-field v-model="username" label="姓名" placeholder="请输入姓名"
                       :rules="[{ required: true, message: '姓名不能为空' }]"/>
            <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号"
                       :rules="[{ required: true, message: '手机号不能为空' }]"/>
            <van-radio-group v-model="sex" direction="horizontal" style="margin: 8px 0 5px 15px">
                <van-radio name="0">男</van-radio>
                <van-radio name="1">女</van-radio>
            </van-radio-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    export default {
        name: "PerfectInformation",
        data() {
            return {
                show: false,
                // 显示字体
                fieldValue: '',
                // 选择的班级
                cascaderValue: [],
                // 选项列表，children 代表子选项，支持多级嵌套
                fieldNames: {
                    text: 'name',
                    value: 'id',
                    children: 'classes',
                },
                username: "",
                phone: "",
                //班级
                dept:[],
                sex:'0'
            }
        },
        computed:{
            ...mapState('user', ['user'])
        },
        methods: {
            ...mapMutations('user', ['setUser']),
            onFinish({selectedOptions}) {
                this.show = false;
                this.fieldValue = selectedOptions.map((option) => option.name).join('/');
                selectedOptions.map((option) => {
                    this.cascaderValue.push(option.id)
                })
            },
            onSubmit() {
                if (this.cascaderValue.length > 0){
                    this.$put("/user",
                        {
                            id: this.user.id,
                            "deptId": this.cascaderValue[0],
                            "classId": this.cascaderValue[1],
                            "username": this.username,
                            "phone": this.phone,
                            'sex' : this.sex
                        })
                    .then(res => {
                        this.$get("/user/" + this.user.id)
                        .then((rs) => {
                            sessionStorage.setItem("user", JSON.stringify(rs.data.user))
                            this.setUser(JSON.parse(sessionStorage.getItem("user")))
                            this.$msg(res.data.msg,'success')
                            this.$router.push({name:'mHome'})
                        })
                    })
                }else {
                    this.$msg("请选择学校","error")
                }
            },

        },
        created() {
            this.setUser(JSON.parse(sessionStorage.getItem("user")))
            this.$get("/school/" + this.user.school.id)
            .then((res) => {
                this.dept = res.data.school.depts
                console.log(this.dept)
            })
        }
    }
</script>

<style scoped>
    .perfectInformation{
        height: 100vh;
        background: white;
    }
    .perfectInformation h3{
        text-align: center;background: white;padding: 15px;font-weight: normal;border-bottom: 1px solid rgb(237 237 237)
    }
    /deep/ .van-field__label{
        width: 3.5em;
    }
</style>