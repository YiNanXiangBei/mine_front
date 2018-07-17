<template>
    <div id="person">
        <Form ref="formValues" :rules="ruleValidate" :model="formValues">
            <Row>
                <Col span="6" offset="3">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="formValues.username" type="text"></Input>
                    </FormItem>
                </Col>
                <Col span="6" offset="3">
                    <FormItem label="密码" prop="password">
                        <Input type="password" v-model="formValues.password"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6" offset="3">
                    <FormItem label="邮箱" prop="email">
                        <Input type="email" v-model="formValues.email"></Input>
                    </FormItem>
                </Col>
                <Col span="6" offset="3" style="margin-top: 35px ">
                       <Button type="info" shape="circle" icon="upload" @click="showavatar = !showavatar">上传头像</Button>
                </Col>
            </Row>
            <Row>
                <Col span="4" offset="3">
                    <FormItem>
                        <Button type="success" long @click="handleSubmit('formValues')">修改</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Modal
            v-model="showmodal"
            title="请再输入一遍新密码"
            @on-ok="ok">
            <Input v-model="passagain" type="password"></Input>
        </Modal>
        <Spin size="large" fix v-show="showspin" style="height: 100%"></Spin>
        <my-upload field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="showavatar"
            :width="300"
            :height="300"
            url="http://127.0.0.1:5000/sysadmin/upload"
            :params="params"
            :headers="headers"
            img-format="png">
        </my-upload>
    </div>
</template>
<script>
import axios from 'axios'
const qs = require('qs')
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload';
// import func from './vue-temp/vue-editor-bridge';
export default {
    data() {
        return {
            showmodal: false,
            showspin: false,
            //传值到后台的参数
            formValues: {
                username: '',
                email: '',
                password: '',
                avatar: ''
            },
            passagain: '',
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 15, message: '新密码不少于15位', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '不符合邮箱规范', trigger: 'blur' }
                ]
            },
            //图片上传相关参数
            showavatar: false,
            params: {
                name: 'Avatar',
                img: ''
            },
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.showmodal = true;
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        ok () {
            //传参到后台
            let params = this.formValues;
            let _this = this;
            if(this.passagain === this.formValues.password) {
                _this.$Spin.show();
                axios({
                    url: 'https://www.easy-mock.com/mock/5b485e01cd6b6d356c8a3f67/person/person',
                    method: 'post',
                    data: params,
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
                        console.log(data)
                        if(data.code === '200') {
                            // _this.showspin = false;
                        } else {
                                
                        }
                    }],
                })
            } else {
                this.$Notice.error({
                    title: '密码不匹配',
                    desc: '请重新确认两次输入的密码相同 '
                });
            }
            
        },
        uploadSuccess(response, file, fileList) {
            this.$Message.info("上传成功！");
        },
        uploadError(error, file, fileList) {
            this.$Message.error("上传失败！");
        },
        cropSuccess(imgDataUrl, field){
            this.params.img = imgDataUrl;
        },
        /**
         * upload success
         *
         * [param] jsonData   服务器返回数据，已进行json转码
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){           
            console.log(status);
        },
        /**
         * 从服务端加载数据
         */
        loadData() {
            let _this = this;
            axios.get('http://127.0.0.1:5000/sysadmin/info',{
                params: {
                    'username': sessionStorage.getItem('username')
                }
            })
            .then(function(response) {
                if (response.data.code == 200) {
                    //请求信息正常，将数据加载到页面上，同时将新的token放入sessionStorage中
                    _this.formValues = response.data.data.info;
                    _this.$store.commit('set_token', response.data.data.token);
                } else {
                    //请求信息不正常，删除token，页面跳转到登录页面
                    _this.$store.commit('del_token');
                    _this.$router.replace({path: '/sysadmin/login'});
                }
                
            })
            .catch(function(error) {
                this.$Message.error({
                    content: '获取用户信息出现异常： ' + error,
                    duration: 2
                });
            })
        }
    },
    components: {
        'my-upload': myUpload
    },
    mounted() {
        this.loadData();
    }
}
</script>
<style scoped>
#person {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 60px;
}

</style>