<template>
    <div id="login">
        <Row>
            <Col span="4" offset="10">
                <h2>欢迎使用 Mine Blog</h2>
                <Form :model="formItems">
                    <FormItem>
                        <Input v-model="formItems.username" placeholder="用户名"></Input>
                    </FormItem>
                    <FormItem>
                        <Input type="password" v-model="formItems.password" placeholder="密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" long @click="login()">登录</Button>
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
            }
        }
    },
    methods: {
        login() {
            let params = this.formItems;
            let _this = this;
            _this.$Spin.show();
            axios({
                url: 'http://127.0.0.1:5000/sysadmin/login',
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
                    if(data.code === 200) {
                        // console.log(data.code)
                        // _this.showspin = false;
                        // _this.$store.state.token = data.data;
                        sessionStorage.setItem('token', data.data);
                        // console.log(data.data)
                    } else {
                            
                    }
                }],
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


