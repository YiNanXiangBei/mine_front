<template>
    <div id="tags">
        <Row>
            <Col span="16" offset="3">
                <Tag v-for="item, index in tags" :key="index" :name="item" type="dot"  color="green">{{ item }}</Tag>
            </Col>
            
        </Row>
        <br>
        <Row>
            <Col offset="3">
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="showCard = true">添加标签</Button>
            </Col>
        </Row>
        <Modal
            v-model="showCard"
            title="添加新的标签"
            @on-ok="ok">
            <Input v-model="newTag" placeholder="请输入新的标签名" @keyup.enter.native="ok" style="width: 100%"></Input>
        </Modal>
    </div>    
</template>
<script>
import axios from 'axios'
const qs = require('qs')
export default {
    data () {
        return {
            tags: [],
            showCard : false,
            newTag: ''
        }
    },
    methods: {
        ok () {
            this.showCard = false;
            //添加新的标签到数据库
            this.$Spin.show();
            let _this = this;
            axios({
                url: process.env.API_HOST + '/sysadmin/add_tags',
                method: 'post',
                data: {tag: _this.newTag},
                headers: {
                    Authorization: sessionStorage.getItem('token')
                },
                transformRequest: [
                    function (params) { // 解决传递数组变成对象的问题
                        Object.keys(params).forEach((key) => {
                        if ((typeof params[key]) === 'object') {
                            params[key] = JSON.stringify(params[key]) // 这里必须使用内置JSON对象转换
                        }
                        })
                        params = qs.stringify(params) // 这里必须使用qs库进行转换
                        return params
                    }
                ],
                transformResponse: [function (data) {
                    //处理返回数据问题，异步
                    // Do whatever you want to transform the data
                    _this.$Spin.hide();
                    data = JSON.parse(data);
                    _this.detailResult(data);
                    _this.loadsData();
                }],
            })
        },
        loadsData() {
            this.$Spin.show();
            let _this = this;
            axios({
                method: 'GET',
                url: process.env.API_HOST + '/sysadmin/tags',
                headers: {
                    Authorization: sessionStorage.getItem('token')
                },
                transformResponse: [function (data) {
                    //处理返回数据问题，异步
                    // Do whatever you want to transform the data
                    _this.$Spin.hide();
                    data = JSON.parse(data);
                    _this.detailResult(data);
                }],

            })
        },
        detailResult(data) {
            switch(data.code) {
                case 200:
                    if (data.data.tags != undefined) {
                        this.tags = data.data.tags;
                    } else {
                        this.newTag = '';
                        this.$Notice.success({
                            title: '添加成功！'
                        });
                    }
                    this.$store.commit('set_token', data.data.token);
                    break;
                case 400:
                    //保存数据失败
                    this.$Message.error({
                        content: '保存数据失败！',
                        duration: 2
                    })
                    break;
                default:
                    //token有问题
                    this.$store.commit('del_token');
                    this.$router.replace({path: '/sysadmin/login'});
            }
        }
    },
    mounted() {
        this.loadsData();
    }
}
</script>
<style scoped>
#tags{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 50px
}
</style>


