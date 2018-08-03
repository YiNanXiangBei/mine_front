<template>
    <div id="password_change">
        <Row v-if="!showMessage" v-show="!showResult">
            <Col span="6" offset="9">
                <h2>请设置{{backEmail}}的新密码，建议使用数字，字母，字符组合密码，提高密码安全性</h2>
                <Form ref="formItems" :model="formItems" :rules="ruleValidate">
                    <FormItem prop="username">
                        <Input v-model="formItems.username" placeholder="用户名" :autofocus='true'></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formItems.password" placeholder="新密码"></Input>
                    </FormItem>
                    <FormItem prop="repeatPassword">
                        <Input type="password" v-model="formItems.repeatPassword" placeholder="再输入一次新密码" @keyup.enter.native="submit('formItems')"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" long @click="submit('formItems')">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        <Row v-if="showMessage" v-show="!showResult">
            <Col span="8" offset="8">
                <h1 class="title is-4">链接以失效，请重新发送邮件重置密码！</h1>
            </Col>
        </Row>
        <Row v-if="showResult">
            <Col span="6" offset="9">
                <h1 class="title is-4">密码重置成功！</h1>
                <a href="/">点击链接，跳转到登录页面</a>
            </Col>
        </Row>
    </div>    
</template>
<script>
var base64 = require('js-base64').Base64
import axios from 'axios'
const qs = require('qs')
export default {
    data() {
        return {
            showResult: false,
            showMessage: false,
            backEmail: '',
            backUsername: '',
            formItems: {
                username: '',
                password: '',
                repeatPassword: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '新密码不少于6位', trigger: 'blur' }
                ],
                repeatPassword: [
                    { required: true, message: '重新输入密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.formItems.password !== this.formItems.repeatPassword) {
                        this.$Message.error({
                            content: '两次输入的密码不同！',
                            duration: 2
                        });
                        return;
                    }
                    if (this.formItems.username !== this.backUsername) {
                        this.$Message.error({
                            content: '该用户不存在！',
                            duration: 2
                        });
                        return;
                    }
                    let params = this.formItems;
                    let _this = this;
                    _this.$Spin.show();
                    axios({
                        url: 'http://127.0.0.1:5000/sysadmin/resetPwd',
                        method: 'put',
                        data: params,
                        transformRequest: [
                            function (params) { // 解决传递数组变成对象的问题
                                Object.keys(params).forEach((key) => {
                                    if ((typeof params[key]) === 'object') {
                                        params[key] = JSON.stringify(params[key]) // 这里必须使用内置JSON对象转换
                                    }
                                })
                                params = qs.stringify(params);// 这里必须使用qs库进行转换
                                return params;
                            }
                        ],
                        transformResponse: [function (data) {
                            //处理返回数据问题，异步
                            // Do whatever you want to transform the data
                            _this.$Spin.hide();
                            data = JSON.parse(data);
                            switch(data.code) {
                                //请求发送邮件成功
                                case 200:
                                    _this.showResult = true;
                                    break;
                                //用户信息校验成功，邮件发送失败
                                default:
                                    _this.$Message.error({
                                        content: data.msg,
                                        duration: 3
                                    });
                            }
                        }],
                    });
                } 
            })
        }
    },
    mounted() {
        let params = this.$route.query.sid;
        params = base64.decode(params);
        let array = params.split('&');
        this.backUsername = array[0].split('=')[1];
        this.backEmail = array[1].split('=')[1];
        let sys_timstamp = parseInt(parseInt(array[2].split('=')[1]) / 1000);
        // console.log(array)
        let username = params;
        let time = Date.parse(new Date()) /1000;
        if (sys_timstamp + 60 < time) {
            //超时，所有输入框和按钮都为disabled
            this.showMessage = true;
        } 
    }
}
</script>
<style scoped>
#password_change {
    padding-top: 9%
}
</style>


