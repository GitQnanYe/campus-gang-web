<template>
    <div class="task">
        <van-tabs @click="onClick" v-model="active">
            <van-tab title="我发布的">
                <div class="piece" v-for="item in tasks">
                    <div class="piece_center">
                        <van-panel>
                            <template #header>
                                <div class="van-cell van-panel__header">
                                    <div class="van-cell__title">
                                         <span style="display: flex;align-items: center">
                            <el-tag :type="item.state == 0 ? 'danger':(item.state == 1 ? 'warning':'success')"
                                    style="margin-right: 5px">{{item.state == 0 ? '待解决':(item.state == 1 ? '服务中':'已完成')}}</el-tag>
                            {{item.taskTitle}}
                        </span>
                                        <div class="van-cell__label">{{item.createTime | formatDate}}</div>
                                    </div>
                                    <div class="van-cell__value van-panel__header-value">
                                        <span style="font-size: 12px" v-show="item.state == 0" @click="cancel(item.id)">取消任务</span>
                                        <span style="font-size: 12px" @click="showRelease(item.accept)" v-show="item.state != 0">查看接收人</span>
                                    </div>
                                </div>
                            </template>
                            <div style="padding: 10px 0px;font-size: 14px;">
                                <van-steps :active="item.state">
                                    <van-step>
                                        发布成功
                                    </van-step>
                                    <van-step>服务中</van-step>
                                    <van-step>交易完成</van-step>
                                </van-steps>
                                <p style="margin: 0 0 25px 0;">
                                    {{item.taskContext}}
                                </p>
                                <div class="task_icon">
                                    <i class="el-icon-money" style="color: red;"> {{item.reward}}元</i>
                                    <el-button :type="item.state != 1? 'info' : 'primary'" round size="mini" :disabled ="item.state != 1? true : false" @click="complete(item.id)">完成任务</el-button>

                                </div>
                            </div>
                        </van-panel>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 10%">
                    <span v-if="tasks.length == 0"><i class="el-icon-refresh-right"></i>暂无发布任务</span>
                </div>
            </van-tab>
            <van-tab title="我接收的">
                <div class="piece" v-for="item in acceptTheTask">
                    <div class="piece_center">
                        <van-panel>
                            <template #header>
                                <div class="van-cell van-panel__header">
                                    <div class="van-cell__title">
                                         <span style="display: flex;align-items: center">
                            <el-tag :type="item.state == 0 ? 'danger':(item.state == 1 ? 'warning':'success')"
                                    style="margin-right: 5px">{{item.state == 0 ? '待解决':(item.state == 1 ? '服务中':'已完成')}}</el-tag>
                            {{item.taskTitle}}
                        </span>
                                        <div class="van-cell__label">{{item.createTime | formatDate}}</div>
                                    </div>
                                    <div class="van-cell__value van-panel__header-value">
                                        <span style="font-size: 12px" v-show="item.state == 0" @click="cancel(item.id)">取消任务</span>
                                        <span style="font-size: 12px" @click="showRelease(item.publish)">查看发布人</span>
                                    </div>
                                </div>
                            </template>
                            <div style="padding: 10px 0px;font-size: 14px;">
                                <p style="margin: 0 0 25px 0;">
                                    {{item.taskContext}}
                                </p>
                                <div class="task_icon">
                                    <i class="el-icon-money" style="color: red;"> {{item.reward}}元</i>
                                    <el-button :type="item.state != 1? 'info' : 'primary'" round size="mini" :disabled ="item.state != 1? true : false" @click="cancelTask(item.id)">取消任务</el-button>
                                </div>
                            </div>
                        </van-panel>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 10%">
                    <span v-if="acceptTheTask.length == 0"><i class="el-icon-refresh-right"></i>暂无接单</span>
                </div>
            </van-tab>
        </van-tabs>

        <van-action-sheet
                v-model="show"
                title="个人信息"
                close-on-click-action
        >
            <van-collapse v-model="activeNames" v-if="acceptId.length != []">
                <van-collapse-item title="姓名" name="1">{{acceptId.username}}</van-collapse-item>
                <van-collapse-item title="电话" name="2">{{acceptId.phone}}</van-collapse-item>
                <van-collapse-item title="学校" name="3">{{acceptId.school.name}}</van-collapse-item>
                <van-collapse-item title="所在系" name="4">{{acceptId.dept.name}}</van-collapse-item>
                <van-collapse-item title="所在班级" name="5">{{acceptId.aclass.name}}</van-collapse-item>
            </van-collapse>
        </van-action-sheet>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {formatDate} from '@/util/date';
    export default {
        name: "Task",
        data(){
            return{
                show:false,
                activeNames: ['1','2','3','4','5'],
                active:0,
                //发布的任务
                tasks:[],
                //接收的任务
                acceptTheTask:[],
                //接收人信息
                acceptId:[],
            }
        },
        computed:{
          ...mapState('user',['user'])
        },
        methods: {
            ...mapMutations('user', ['setUser']),
            onClick(name, title) {

            },
            //显示发布人或接收人
            showRelease(val){
                this.acceptId = val
                this.show = !this.show
            },
            //取消任务
            cancel(id){
                this.$dialog.alert({
                    title: '取消任务',
                    message: '确定取消任务吗',
                    showCancelButton:true
                }).then(() => {
                    this.$del("/task/" + id)
                    .then(res => {
                        this.$get("/user",{id:this.user.id})
                        .then((rs) => {
                            sessionStorage.setItem("user", JSON.stringify(rs.data.user))
                            this.setUser(JSON.parse(sessionStorage.getItem("user")))
                        })
                        this.$msg(res.data.msg,"success" );
                        this.newList()
                    })
                }).catch(()=>{

                })
            },
            //获取我发布的任务
            newList(){
                this.$get("/task/published",{id: this.user.id})
                .then(res=>{
                    this.tasks = res.data.task
                })
            },
            //获取我接收的任务
            newReceive() {
                this.$get("/task/accepted", {id: this.user.id})
                .then(res => {
                    this.acceptTheTask = res.data.task
                    // console.log(this.acceptTheTask)
                })
            },
            //完成任务
            complete(id){
                this.$dialog.alert({
                    title: '提示',
                    message: '确定接收人完成此任务了吗',
                    showCancelButton:true
                }).then(() => {
                    this.$put('task/' + id)
                    .then(res => {
                        this.$msg(res.data.msg,"success" );
                        this.newList()
                    })
                }).catch(()=>{

                })
            },
            //取消接收的任务
            cancelTask(id){
                this.$dialog.alert({
                    title: '提示',
                    message: '确定取消该任务吗',
                    showCancelButton:true
                }).then(() => {
                    this.$put('/task/takerCancel/' + id)
                    .then(res => {
                        this.$msg(res.data.msg,"success")
                        this.newReceive()
                    })
                }).catch(()=>{

                })
            }
        },
        created() {
            if(this.$route.params.index){
                this.active = this.$route.params.index
            }
            this.newList()
            this.newReceive()
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
    }
</script>

<style scoped lang="less">
    [class*=van-hairline]::after{
        border: none;
    }
    .van-steps--horizontal{
        padding: 0;
    }
    .van-cell::after{
        left: 0px;
        right:0px;
        border-bottom: 1px solid #ccc;
    }
    .piece {
        margin: 10px;
        padding: 10px 10px 10px 10px;
        border-radius: 10px;
        background: white;
        .van-cell{
            padding: 5px 0px;
        }
    }

    .task_icon{
        display: flex;justify-content: space-between;align-items: center
    }
    /deep/ .van-step--horizontal .van-step__title{
        font-size: 14px !important;
    }
</style>