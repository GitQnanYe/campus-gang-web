<template>
    <div class="home">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action>
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
        <van-swipe class="swipe" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image"/>
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar style="margin: 5px 0px"
                        scrollable
                        left-icon="volume-o"
                        text="校园帮APP上线了。"
                        background="#8a97f6"
                        color="#fff"
        />
        <div class="center">
            <div class="piece" v-for="item in tasks" v-if="item.state == 0">
                <div class="piece_center">
                    <van-panel>
                        <template #header>
                            <div class="van-cell van-panel__header">
                                <div class="van-cell__title">
                                    <span><van-tag type="success"
                                                   style="padding: 2px 5px;margin-right: 10px">待解决</van-tag>{{item.taskTitle}}</span>
                                    <div class="van-cell__label">{{item.createTime | formatDate}}</div>
                                </div>
                                <div class="van-cell__value van-panel__header-value">
                                    <span style="font-size: 12px" v-show="item.publish.id == user.id">本人任务</span>
                                    <span style="font-size: 12px" @click="jump(item.id)"
                                          v-show="item.publish.id != user.id">接受任务</span>
                                </div>
                            </div>
                        </template>
                        <div style="padding: 10px 0px;font-size: 14px;">
                            <p style="margin-bottom: 5px;">
                                {{item.taskContext}}
                            </p>
                            <van-tag type="danger" style="padding: 2px;float: right;font-size: 12px">悬赏
                                {{item.reward}}元
                            </van-tag>
                        </div>
                    </van-panel>
                </div>
            </div>
        </div>
        <van-button @click="plus" icon="plus" type="info"
                    style="border-radius: 100px;width: 40px;height: 40px;position: fixed;bottom: 60px;right: 20px;"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';
    import {formatDate} from '@/util/date';

    export default {
        name: 'Home',
        data() {
            return {
                value: '',
                show: false,
                images: [
                    require('../../../assets/images/pic01.png'),
                    require('../../../assets/images/pic02.png'),
                    require('../../../assets/images/pic03.png'),
                ],
                tasks: []
            }
        },
        computed: {
            ...mapState('user', ['user'])
        },
        methods: {
            ...mapMutations(['setActive']),
            messages(id) {
                this.id = id;
                this.show = true
            },
            jump(id) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否接受该任务',
                })
                    .then(() => {
                        this.$put('task/takerAccept', {id: id, "acceptId": this.user.id})
                            .then(res => {
                                this.$msg(res.data.msg, "success");
                                this.setActive(1)
                                sessionStorage.setItem("active", 1)
                                this.$router.push({name: 'mTask', params: {index: 1}})
                            })
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            plus() {//跳转到发布页面
                this.$router.push({name: 'mrelease'})
            },
            onSearch() {
                this.$msg("敬请期待,正在努力开发", "error")
            }

        },
        created() {
            this.$get("/task", {id: this.user.id})
                .then((res) => {
                    this.tasks = res.data.task
                })
            // console.log(this.user)
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
    }
</script>

<style lang="less">
    .swipe img {
        height: 33vh;
        width: 100%;
    }

    [class*=van-hairline]::after {
        border: none;
    }

    .van-steps--horizontal {
        padding: 0;
    }

    .van-cell::after {
        left: 0px;
        right: 0px;
        border-bottom: 1px solid #ccc;
    }

    .piece {
        margin: 10px;
        padding: 10px 10px 20px 10px;
        border-radius: 10px;
        background: white;

        .van-cell {
            padding: 5px 0px;
        }
    }

    .van-search__action {
        padding: 0 12px 0 8px !important;
    }

</style>
