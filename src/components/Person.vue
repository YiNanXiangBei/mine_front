<template>
    <div id="person">
        <Form ref="formValues" :rules="ruleValidate" :model="formValues">
            <Row>
                <Col span="6" offset="3">
                    <FormItem label="用户名" prop="name">
                        <Input v-model="formValues.name" type="text"></Input>
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
                    <FormItem label="邮箱" prop="mail">
                        <Input type="email" v-model="formValues.mail"></Input>
                    </FormItem>
                </Col>
                <Col span="6" offset="3">
                    <FormItem>
                        <Upload
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-plus-empty" size="45"></Icon>
                                <p>头像上传</p>
                            </div>
                        </Upload>
                    </FormItem>
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
    </div>
</template>
<script>
export default {
    data() {
        return {

            showmodal: false,
            formValues: {
                name: 'laowang',
                mail: '123@qq.com',
                password: '11111111111111111'
            },
            passagain: '',
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 15, message: '新密码不少于15位', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '不符合邮箱规范', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],
                date: [
                    { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
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
            this.$Message.info('Clicked ok');
        },
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