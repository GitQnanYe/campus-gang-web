<template>
    <div class="release">
        <van-nav-bar title="发布任务" left-text="返回" left-arrow @click-left="back"></van-nav-bar>
        <div class="enter">
            <p class="title">发布任务</p>
            <van-form @submit="onSubmit">
                <van-field v-model="taskTitle" label="任务标题" placeholder="请输入任务标题"
                           :rules="[{ required: true, message: '任务标题不能为空' }]"/>
                <van-field v-model="reward" type="number" placeholder="请输入奖励" label="奖励" :rules="[{ required: true, message: '奖励不能为空' }]">
                    <template #extra>余额 {{user.balance}}</template>
                </van-field>
                <van-field
                        v-model="taskContext"
                        rows="3"
                        autosize
                        label="详细描述"
                        type="textarea"
                        maxlength="50"
                        placeholder="请输入详细描述"
                        show-word-limit
                        :rules="[{ required: true, message: '详细描述不能为空' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    import {mapMutations,mapState} from 'vuex';
    export default {
        name: "Release",
        data() {
            return {
                taskTitle: "",
                reward: "",
                taskContext: ""
            }
        },
        computed:{
            ...mapState('user', ['user'])
        },
        methods: {
            ...mapMutations(['setActive']),
            ...mapMutations('user', ['setUser']),
            back() {
                history.back()
            },
            onSubmit() {
                this.$post("/task/api/addTask",
                    {"publishId.id":this.user.id,"schoolId.id":this.user.school.id,"reward":this.reward,"taskTitle":this.taskTitle,"taskContext":this.taskContext}
                ).then(res=>{
                    if (res.data.status){
                        this.$get("/user/api/findUserById",{id:this.user.id})
                        .then((rs) => {
                            sessionStorage.setItem("user", JSON.stringify(rs.data.user))
                            this.$msg(res.data.msg,"success")
                            this.setActive(1)
                            sessionStorage.setItem("active",1)
                            this.$router.push({name:"mTask"})
                        })

                    }else {
                        this.$msg(res.data.msg,"error")
                    }
                })
            },

        },
        created() {
            if (!sessionStorage.getItem('user')){
                this.$msg("您向未登陆,没有权限","error")
                this.$router.push("/m/login")
            }else {
                this.setUser(JSON.parse(sessionStorage.getItem("user")))
            }
        }
    }
</script>

<style scoped>
    .title{
        background-color: #f4f4f5;
        color: #909399;
        padding: 5px 16px;
        font-size: 13px;
    }
</style>