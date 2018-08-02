<template>
    <div id="password_change">
        <Row>
            <Col span="4" offset="10">
                <h2>请设置{{backEmail}}的新密码，建议使用数字，字母，字符组合密码，提高密码安全性</h2>
                <Form ref="formItems" :model="formItems" :rules="ruleValidate">
                    <FormItem prop="username">
                        <Input v-model="formItems.username" placeholder="用户名" :autofocus='true'></Input>
                    </FormItem>
                    <FormItem prop="email">
                        <Input type="email" v-model="formItems.email" placeholder="邮箱"></Input>
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
    </div>    
</template>
<script>
export default {
    data() {
        return {
            backEmail: '**est@qq.com',
            backUsername: '',
            timestamp: '',
            formItems: {
                username: '',
                email: '',
                password: '',
                repeatPassword: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '不符合邮箱规范', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
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
                    if (this.formItems.username !== this.backEmail) {
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
                                    break;
                                //用户信息校验失败
                                case 400:
                                    break;
                                //用户信息校验成功，邮件发送失败
                                default:
                            }
                        }],
                    });
                } 
            })
        }
    },
    mounted() {
        let params = this.$route.query.sid;
        let time = Date.parse(new Date()) /1000;
        if (this.timestamp + 86400 < time) {
            //超时，所有输入框和按钮都为disabled
        }
        console.log(params);

    }
}
</script>
<style scoped>
#password_change {
    padding-top: 13%
}
</style>


