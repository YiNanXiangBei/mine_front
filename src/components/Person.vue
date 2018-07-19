<template>
    <div id="person">
        <Form ref="formValues" :rules="ruleValidate" :model="formValues">
            <Row>
                <Col span="6" offset="3">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="formValues.username" disabled type="text"></Input>
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
            id: '',
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
                    { type: 'string', min: 3, message: '新密码不少于3位', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '不符合邮箱规范', trigger: 'blur' }
                ]
            },
            //图片上传相关参数
            showavatar: false,
            params: {
                username: '',
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
                    url: 'http://127.0.0.1:5000/sysadmin/info',
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

                        switch(data.code) {
                            case 200:
                                //保存数据成功
                                _this.formValues = data.data.info;
                                _this.$store.commit('set_token', data.data.token);
                                break;
                            case 400:
                                //保存数据失败
                                _this.$Message.error({
                                    content: '保存数据失败！',
                                    duration: 2
                                })
                                break;
                            default:
                                //token有问题
                                _this.$store.commit('del_token');
                                _this.$router.replace({path: '/sysadmin/login'});
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
        cropSuccess(imgDataUrl, field){
            this.params.img = imgDataUrl;
            this.params.username = this.formValues.username;
        },
        /**
         * upload success
         *
         * [param] jsonData   服务器返回数据，已进行json转码
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
            let code = jsonData.code;
            switch(code) {
                case 200:
                    //文件上传成功
                    this.formValues.avatar = jsonData.data.image_url;
                    this.$emit('changeAvatar', jsonData.data.image_url);
                    this.$store.commit('set_token', jsonData.data.token);
                    break;
                case 400:
                    //token验证成功，文件上传失败
                    this.$Notice.error({
                        title: '文件上传失败',
                        desc: '文件上传到云存储失败'
                    });
                default:
                    //token 验证失败
                    this.$store.commit('del_token');
                    this.$router.replace({path: '/sysadmin/login'});
            }
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){       
            this.$Notice.error({
                title: '文件上传失败',
                desc: '文件上传服务端失败'
            })    
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
                switch(response.data.code) {
                    case 200:
                        //请求信息正常，将数据加载到页面上，同时将新的token放入sessionStorage中
                        _this.formValues = response.data.data.info;
                        _this.$store.commit('set_token', response.data.data.token);
                        _this.$emit('changeAvatar', _this.formValues.avatar);
                        break;
                    default:
                        //请求信息不正常，删除token，页面跳转到登录页面
                        _this.$store.commit('del_token');
                        _this.$router.replace({path: '/sysadmin/login'});
                }
            })
            .catch(function(error) {
                _this.$Message.error({
                    content: '获取用户信息出现异常： ' + error,
                    duration: 3
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