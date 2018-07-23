<template>
    <div id="login">
        <Row>
            <Col span="4" offset="10">
                <h2>欢迎使用 Mine Blog</h2>
                <Form ref="formItems" :model="formItems" :rules="ruleValidate">
                    <FormItem prop="username">
                        <Input v-model="formItems.username" placeholder="用户名" :autofocus='true'></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formItems.password" placeholder="密码" @keyup.enter.native="login('formItems')"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" long @click="login('formItems')">登录</Button>
                    </FormItem>
                </Form>
                <p>
                    <a href="#">忘记密码了?</a>
                </p>
            </Col>
        </Row>
    </div>    
</template>
<script>
import axios from 'axios'
const qs = require('qs')
export default {
    data() {
        return {
            formItems: {
                username: '',
                password: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        login(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = this.formItems;
                    let _this = this;
                    _this.$Spin.show();
                    axios({
                        url: 'http://127.0.0.1:5000/sysadmin/login',
                        method: 'post',
                        data: params,
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
                                params = qs.stringify(params);// 这里必须使用qs库进行转换
                                return params;
                            }
                        ],
                        transformResponse: [function (data) {
                            //处理返回数据问题，异步
                            // Do whatever you want to transform the data
                            _this.$Spin.hide();
                            data = JSON.parse(data);
                            if(data.code === 200) {
                                sessionStorage.setItem('token', data.data);
                                _this.$store.commit('set_username', params.username)
                                let redirect = _this.$route.query.redirect;
                                if (redirect == "" || redirect == undefined) {
                                    _this.$router.push({path: '/sysadmin'});
                                } else {
                                    _this.$router.push({path: redirect});
                                }
                            } else {
                                _this.$Message.error({
                                    content: data.msg,
                                    duration: 2
                                });
                                _this.$store.commit('del_token');
                            }
                        }],
                    });
                } else {
                    this.$Message.error({
                        content: '用户名或密码不能为空！',
                        duration: 2
                    });
                }
            })
        }
    }
}
</script>
<style scoped>
#login {
    padding-top: 13%
}
p {
    text-align: center
}
h2 {
    text-align: center
}
</style>


