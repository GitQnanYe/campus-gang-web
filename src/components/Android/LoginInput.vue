<template>

    <van-form @submit="onSubmit">
        <van-field
                v-model="studentId"
                name="学号"
                left-icon="friends-o"
                placeholder="请输入学号"
                :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
                v-model="password"
                type="password"
                name="密码"
                left-icon="closed-eye"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
                readonly
                clickable
                name="picker"
                :value="value"
                left-icon="newspaper-o"
                placeholder="点击选择学校"
                @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="school"
                    value-key="name"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
            />
        </van-popup>
        <slot name="prompt"></slot>
        <div style="margin: 16px 0;">
            <van-button round block native-type="submit">
                {{btn}}
            </van-button>
        </div>
        <van-checkbox v-model="checked" style="font-size: 10px">已同意<a href="#" style="color: red">《平台登陆协议》</a>及<a
                href="#" style="color: red">《隐私政策》</a></van-checkbox>
    </van-form>
</template>

<script>
    export default {
        name: "LoginInput",
        props:['btn'],
        data() {
            return {
                studentId: '',
                password: '',
                value: '',
                schoolId:"",
                school: [],
                showPicker: false,
                checked: true,
            }
        },
        methods: {
            onConfirm(value) {
                this.value = value.name;
                this.schoolId = value.id
                this.showPicker = false;
            },
            onSubmit() {
                if (this.value != "" && this.checked){
                    if (this.btn === '登录'){
                        this.$get("/user/login",
                            {"studentId": this.studentId, "password": this.$md5(this.password), "schoolId": this.schoolId})
                        .then(res=>{
                            if (res.data.status) {
                                if (res.data.user.state == 0){
                                    let accountOrName = res.data.user.username?res.data.user.username:res.data.user.studentId;
                                    //存储数据到sessionStorage
                                    sessionStorage.setItem("user",JSON.stringify(res.data.user));
                                    this.$msg(accountOrName + "，登录成功", "success")
                                    this.$router.push('/m/home')
                                }else {
                                    this.$msg('该用户已被冻结，请联系管理员', "error")
                                }
                            } else {
                                this.$msg(res.data.msg, "error")
                            }
                        })
                    }else {
                        this.$post("/user",
                            {"studentId": this.studentId, "password": this.$md5(this.password), "schoolId": this.schoolId}
                        ).then((res) => {
                            if (res.data.status) {
                                this.$msg(res.data.msg, "success")
                                this.$router.push('/m/login')
                            } else {
                                this.$msg(res.data.msg, "error")
                            }
                        })
                    }

                }else if (this.value == ''){
                    this.$msg("请选择学校","error")
                }else {
                    this.$msg("请勾选用户协议","error")
                }
            },
        },
        created() {
            this.$get("/school")
            .then((res) => {
                // console.log(res.data.schools)
                this.school = res.data.school
            })
        }
    }
</script>

<style scoped lang="less">
    /deep/ .van-field__left-icon {
        margin-right: 15px !important;
    }

    .van-cell {
        padding: 15px 0;
    }

    .van-button {
        background: #8a97f6;
        color: #fff;
    }

    .van-checkbox {
        justify-content: center;
    }

    /deep/ .van-checkbox__icon {
        font-size: 16px;

        a {
            color: red;
        }
    }
</style>