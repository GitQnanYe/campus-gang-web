<template>
    <div class="login">
        <div class="login_top">
            <div class="login_ba"></div>
            <div class="login_nav">
                <img src="../../../assets/logo_transparent.png" class="pic">
            </div>
            <div class="login_window">
                <login-input btn="登录">
                    <template v-slot:prompt>
                        <p>
                            <span @click="$router.push({name:'mRegistered'})">去注册</span>
                            <span style="float: right">忘记密码</span>
                        </p>
                    </template>
                </login-input>
            </div>
        </div>
    </div>
</template>

<script>

    import LoginInput from "../../../components/Android/LoginInput";
    export default {
        name: "Login",
        components: {LoginInput},
        data() {
            return {};
        },
        methods: {

        },
    }
</script>

<style scoped lang="less">

    .login_top {
        position: relative;
        height: 26.5vh;
    }

    .login_ba {
        height: 100%;
        background: #8a97f6;
        border-radius: 50%;
        transform: scale(2);
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .login_nav {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: center;

        .pic {
            height: 15vh;
            border-radius: 10px;
        }

    }

    .login_window {
        box-sizing: border-box;
        padding: 15px 15px 25px 15px;
        position: absolute;
        width: 90vw;
        left: 5vw;
        background: white;
        border-radius: 10px;

        p {
            margin: 30px 0;
            font-size: 12px;
        }
    }

</style>