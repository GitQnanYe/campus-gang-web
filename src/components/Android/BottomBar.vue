<template>
    <div>
        <van-tabbar v-model="$store.state.active" @change="onChange">
            <van-tabbar-item icon="home-o" to="/m/home">首页</van-tabbar-item>
            <van-tabbar-item icon="gold-coin-o" to="/m/task">任务</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/m/me">我的</van-tabbar-item>
        </van-tabbar>
        <router-view style="padding-bottom: 50px"></router-view>
    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "BottomBar",
        data() {
            return {

            }
        },
        computed:{
            ...mapState('user', ['user'])
        },
        methods:{
            ...mapMutations('user', ['setUser']),
            ...mapMutations(['setActive']),
            onChange(index) {
                this.setActive(index)
                sessionStorage.setItem("active",index)
            },
        },
        created() {
            if (sessionStorage.getItem('user')){
                this.setUser(JSON.parse(sessionStorage.getItem("user")))
                if (this.user.dept){
                    if (sessionStorage.getItem('active')){
                        this.setActive(JSON.parse(sessionStorage.getItem('active')));
                    }
                }else {
                    this.$router.push({name:'PerfectInformation'})
                }
            }else {
                this.$msg("您向未登陆,没有权限","error")
                this.$router.push("/m/login")
            }
        }
    }
</script>

<style scoped>
    .van-tabbar--fixed{
        z-index: 99;
    }
</style>