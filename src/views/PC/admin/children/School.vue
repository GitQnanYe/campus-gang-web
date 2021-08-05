<template>
    <div class="content">
        <el-table
                :data="dataList"
                style="width: 100%;margin-bottom: 20px;"
                row-key="uuid"
                border
                :default-expand-all = 'false'
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="name"
                    label="学校"
                    sortable
                    width="230">
            </el-table-column>
            <el-table-column
                    prop="deptname"
                    label="系"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="classesname"
                    label="班级">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    >删除
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">增加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "School",
        data() {
            return {
                schools : []
            }
        },
        methods: {
            guid2() {
                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            }
        },
        created() {
            this.$get('/school')
            .then(res => {
                // console.log(res.data)
                // console.log(this.schools)
                this.schools = res.data.school
            })
        },
        computed:{
            dataList(){
                return this.schools.map(item => {
                    let depts = [];
                    for (let i = 0;i<item['depts'].length;i++){
                        // console.log(item['depts'][i]['classes'])
                        depts.push(
                            {
                                deptsId : item['depts'][i].id,
                                deptname : item['depts'][i].name,
                                uuid : this.guid2()
                            }
                        )
                        // console.log(depts)
                        let children = [];
                        for (let j = 0;j<item['depts'][i]['classes'].length;j++){
                            children.push(
                                {
                                    classesId : item['depts'][i]['classes'][j].id,
                                    classesname:item['depts'][i]['classes'][j].name,
                                    uuid : this.guid2()
                                }
                            )
                        }
                        depts[i].children = children
                    }
                    return{
                            schoolId : item.id,
                            name : item.name,
                            children : depts,
                            uuid : this.guid2()
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .content {
        padding: 0 1%;
    }
</style>