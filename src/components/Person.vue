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
                    <FormItem label="邮箱" prop="email">
                        <Input type="email" v-model="formValues.email"></Input>
                    </FormItem>
                </Col>
                <Col span="6" offset="3">
                    <FormItem>
                       <vueCropper
                            ref="cropper3"
                            :img="example3.img"
                            :autoCrop="example3.autoCrop"
                            :autoCropWidth="example3.autoCropWidth"
                            :autoCropHeight="example3.autoCropHeight"
                            :fixedBox="example3.fixedBox"
                        ></vueCropper>
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
        <Spin size="large" fix v-show="showspin"></Spin>
    </div>
</template>
<script>
import axios from 'axios'
const qs = require('qs')
import VueCropper from 'vue-cropper'
export default {
    data() {
        return {

            example3: {
				img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
				autoCrop: true,
				autoCropWidth: 200,
				autoCropHeight: 200,
				fixedBox: true
			},

            showmodal: false,
            showspin: false,
            formValues: {
                id: '',
                name: 'laowang',
                email: '123@qq.com',
                password: '11111111111111111',
                avatar: '',
                token: ''
            },
            passagain: '11111111111111111',
            ruleValidate: {
                name: [
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
                _this.showspin = true;
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
                        _this.showspin = false;
                        data = JSON.parse(data);
                        console.log(data)
                        if(data.code === '200') {
                            _this.showspin = false;
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
        }
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