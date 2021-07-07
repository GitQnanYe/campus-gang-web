<template>
    <div class="registered">
        <van-nav-bar title="注册" left-arrow @click-left="comeBack">
        </van-nav-bar>
        <div class="module">
            <login-input btn="注册">
                <template v-slot:prompt>
                    <p>
                        <span @click="$router.push({name:'mlogin'})">已有帐号?去登录</span>
                    </p>
                </template>
            </login-input>
        </div>
    </div>
</template>

<script>
    import LoginInput from "../../../components/Android/LoginInput";

    export default {
        name: "Registered",
        components: {LoginInput},
        methods:{
            comeBack(){
                window.history.back()
            }
        }
    }
</script>

<style scoped lang="less">
    /deep/ .van-nav-bar__content {
        background: #7584ed;
    }

    /deep/ .van-nav-bar__title {
        color: white;
    }

    /deep/ .van-nav-bar .van-icon {
        color: white;
    }

    .registered {
        height: 100vh;
        background: #fff;
    }

    .module {
        padding: 10px 20px;

        p {
            margin: 30px 0;
            font-size: 12px;
        }
    }
</style>