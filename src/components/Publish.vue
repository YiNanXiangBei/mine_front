<template>
    <div id="publish">
        <Form ref="formValues" :rules="ruleValidate" :model="formValues">
            <Row>
                <Col span="18" offset="3">
                <FormItem label="标题" prop="title">
                        <Input size="large" v-model="formValues.title" type="text" :autosize='true' :autofocus='true'></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="18" offset="3">
                    <FormItem label="描述" prop="desc">
                        <Input size="large" v-model="formValues.desc" type="text" :autosize='true'></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="18" offset="3">
                    <FormItem label="标签" prop="tag">
                        <Select
                            v-model="selectOption"
                            multiple
                            filterable
                            remote
                            :remote-method="remoteMethod"
                            @on-query-change="onQueryChange"
                            :loading="loading"
                            size="large">
                            <Option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="18" offset="3">
                    <mavon-editor v-model="formValues.content" placeholder="开始编辑" style="z-index: 0" @fullScreen="fullScreen"></mavon-editor>
                </Col>
            </Row>
            <br>
            <Row v-show="showButton">
                <Col span="3" offset="3">
                    <FormItem>
                        <Button type="success" size="large" long @click="handleSubmit('formValues')">发布</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <BackTop></BackTop>
    </div>
</template>
<script>
import axios from 'axios'
const qs = require('qs')
export default {
    data () {
        return {
            showheader: true,
            showButton: true,
            selectOption: [],
            loading: false,
            options: [],
            list: [],
            formValues: {
                title: '今天是个好日子',
                desc: '关于今天天气的介绍',
                content: '# 今天是个好日子'
            },
            passagain: '',
            ruleValidate: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '描述不能为空', trigger: 'blur' },
                    { type: 'string', max: 200, message: '描述不能多余200个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        remoteMethod (query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.list.map(item => {
                        return {
                            value: item,
                            label: item,
                        };
                    });
                    this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.options = [];
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.info('success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        fullScreen(status, value) {
            if (status === true) {
                this.$Message.info('full screen!');
                this.showButton = false;
                //向sidebar传值
                this.$emit('showheader', false);
            } else if(status === false) {
                this.$Message.info('screen!');
                this.showButton = true;
                this.$emit('showheader', true);
            }
            
        },
        onQueryChange(value) {
            // console.log(value);
            let _this = this;
            if (value != '') {
                axios.get('http://127.0.0.1:5000/sysadmin/blurry_tags', {
                    params: {
                        tag: value
                    },
                    headers: {
                        'Authorization': sessionStorage.getItem('token')
                    }
                })
                .then(function (response) {
                    // this.detailResult(response);
                    _this.detailResult(response.data);
                })
                .catch(function (error) {
                    _this.$Message.error({
                        content: error,
                        duration: 2
                    })
                })
            }
        },
        detailResult(data) {
            switch(data.code) {
                case 200:
                    if (data.data.tags != undefined) {
                        console.log(data.tags)
                        this.list = data.data.tags;
                    }
                    this.$store.commit('set_token', data.data.token);
                    break;
                case 400:
                    //保存数据失败
                    this.$Message.error({
                        content: '保存数据失败！',
                        duration: 2
                    })
                    break;
                default:
                    //token有问题
                    this.$store.commit('del_token');
                    this.$router.replace({path: '/sysadmin/login'});
            }
        }
    }
}
</script>
<style scoped>
#publish {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 40px;
    padding-bottom: 50px;
}
</style>


