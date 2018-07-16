<template>
    <div id="login">
        <Row>
            <Col span="4" offset="10">
                <h2>欢迎使用 Mine Blog</h2>
                <Form :model="formItem">
                    <FormItem>
                        <Input v-model="formItem.username" placeholder="用户名"></Input>
                    </FormItem>
                    <FormItem>
                        <Input type="password" v-model="formItem.password" placeholder="密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" long>登录</Button>
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
export default {
    data() {
        return {
            formItem: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        
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


