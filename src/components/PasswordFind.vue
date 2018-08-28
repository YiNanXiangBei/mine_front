<template>
    <div id="find_password">
        <Row v-if="!showResult">
            <Col span="4" offset="10">
                <h2 class="title is-4">密码找回</h2>
                <Form ref="formItems" :model="formItems" :rules="ruleValidate">
                    <FormItem prop="username">
                        <Input v-model="formItems.username" placeholder="用户名" :autofocus='true'></Input>
                    </FormItem>
                    <FormItem prop="email">
                        <Input type="email" v-model="formItems.email" placeholder="邮箱" @keyup.enter.native="submit('formItems')"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" long @click="submit('formItems')">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        <Row v-if="showResult">
            <Col span="8" offset="8">
                <h1 class="title is-4">邮件发送成功，请立即前往收件箱点击相关链接，重置密码！</h1>
                <a href="/sysadmin/password_find">如未受到邮件，请点击这里重新发送邮件！>></a>
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
            showResult: false,
            formItems: {
                username: '',
                email: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '不符合邮箱规范', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = this.formItems;
                    let _this = this;
                    _this.$Spin.show();
                    axios({
                        url: process.env.API_HOST + '/sysadmin/verify',
                        method: 'post',
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
                                //用户信息校验失败
                                case 400:
                                    _this.$Message.error({
                                        content: '用户信息不正确，请确认信息正确性！',
                                        duration: 3
                                    });
                                    break;
                                //用户信息校验成功，邮件发送失败
                                default:
                                    _this.$Message.error({
                                        content: '邮件发送失败，可能邮件系统出现问题，请联系管理员！',
                                        duration: 3
                                    });
                            }
                        }],
                    });
                } else {
                    this.$Message.error({
                        content: '用户名或邮箱填写不符合规范！',
                        duration: 2
                    });
                }
            })
        }
    }
}
</script>
<style scoped>
#find_password {
    padding-top: 13%
}
</style>


