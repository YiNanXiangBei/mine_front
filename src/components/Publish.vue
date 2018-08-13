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
                    <FormItem label="背景图片">
                        <Input size="large" v-model="formValues.back_img" type="text" :autosize='true'></Input>
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
                    <mavon-editor ref=md v-model="formValues.content" :imageClick="imageClick" placeholder="开始编辑" style="z-index: 0" @imgAdd="imgAdd" @fullScreen="fullScreen"></mavon-editor>
                </Col>
            </Row>
            <br>
            <Row v-show="showPublishButton">
                <Col span="3" offset="3">
                    <FormItem>
                        <Button type="success" size="large" :disabled="buttonDisable" long @click="handleSubmit('formValues')">发布</Button>
                    </FormItem>
                </Col>
                <Col span="3" offset="1">
                    <FormItem>
                        <Button size="large" :disabled="buttonDisable" long @click="canclePublish">放弃</Button>
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
            buttonDisable: false,
            isAutoSave: false,
            intervalId: '',
            time: 0,
            isEditer: false,
            showPublishButton: true,
            showheader: true,
            selectOption: [],
            loading: false,
            options: [],
            list: [],
            formValues: {
                title: '',
                desc: '',
                content: '',
                back_img: ''
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
        //发布文章
        handleSubmit(name) {
            let _this = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //判断没有未填项，准备向后台传数据
                    this.$Spin.show();
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:5000/sysadmin/article',
                        data: {
                            tags: this.selectOption,
                            title: this.formValues.title.trim(),
                            desc: this.formValues.desc,
                            content: this.formValues.content,
                            back_img: this.formValues.back_img
                        },
                        headers: {
                            Authorization: sessionStorage.getItem('token')
                        },
                        transformRequest: [function(params) {
                            //解决传递数组变成对象的问题
                            Object.keys(params).forEach((key) => {
                            if ((typeof params[key]) === 'object') {
                                params[key] = JSON.stringify(params[key]) // 这里必须使用内置JSON对象转换
                            }
                            })
                            params = qs.stringify(params) // 这里必须使用qs库进行转换
                            return params
                        }],
                        transformResponse: [function(response) {
                            _this.$Spin.hide();
                            response = JSON.parse(response);
                            _this.detailResult(response);
                        }]
                    })
                } else {
                    //有未填项，直接报错
                    this.$Message.error('发布失败!');
                }
            })
        },
        //全屏事件
        fullScreen(status, value) {
            if (status === true) {
                this.showPublishButton = false;
                //向sidebar传值
                this.$emit('showheader', false);
            } else if(status === false) {
                this.showPublishButton = true;
                this.$emit('showheader', true);
            }
            
        },
        // 点击图片事件
        imageClick() {
            return false;
        },
        onQueryChange(value) {
            let _this = this;
            if (value != '') {
                axios.get('http://127.0.0.1:5000/sysadmin/blurry_tags', {
                    params: {
                        tag: value
                    },
                    headers: {
                        Authorization: sessionStorage.getItem('token')
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
        detailResult(data, pos) {
            switch(data.code) {
                case 200:
                    if (data.data.image_url != undefined) {
                        this.$refs.md.$img2Url(pos, data.data.image_url);
                    }
                    if (data.data.tags != undefined) {
                        this.list = data.data.tags;
                    } else {
                        this.$Message.success({
                            content: '提交成功！',
                            duration: 2
                        })
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
                case 417:
                    this.$Message.warning({
                        content: '文章标题已经存在!',
                        duration: 4
                    })
                    break;
                default:
                    //token有问题
                    this.$store.commit('del_token');
                    this.$router.replace({path: '/sysadmin/login'});
            }
        },
        imgAdd(pos, $file) {
            let _this = this;
            var formdata = new FormData();
            formdata.append('file', $file);
            axios({
                url: 'http://127.0.0.1:5000/sysadmin/upload_image',
                method: 'post',
                data: formdata,
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            }).then((response) => {
                this.detailResult(response.data, pos);
            }).catch((error) => {
                _this.$Message.error({
                    content: '上传图片出现异常： ' + error,
                    duration: 3
                });
            })
        },
         /**
        * 重置时间计数器
        */
        resetTime() {
            clearInterval(this.intervalId);
            this.time = 0;
            this.intervalId = setInterval(this.autoSubmit, 1000);
        },
        /**
        *自动保存 
        */
        autoSubmit() {
            this.time += 1;
            if (this.time == 1 * 300) {
                //自动保存数据操作
                this.buttonDisable = true;
                this.isAutoSave = true;
                if (this.formValues) {
                    localStorage.setItem("formValues", JSON.stringify(this.formValues));
                }
                if (this.selectOption) {
                    localStorage.setItem("tags", JSON.stringify(this.selectOption));
                }
                this.$Message.success({
                    content: '数据成功自动保存！',
                    duration: 2
                });
                clearInterval(this.intervalId);
                this.buttonDisable = false;
            }
        },
        /**
        放弃发布文章*/
        canclePublish() {
            clearInterval(this.intervalId);
            this.formValues.title = '';
            this.formValues.desc = '';
            this.formValues.content = '';
            this.formValues.back_img = '';
            this.selectOption = [];
            if (localStorage.getItem("formValues")) {
                localStorage.removeItem("formValues");
            }
            if (localStorage.getItem("tags")) {
                localStorage.removeItem("tags");
            }
            
        }
    },
    mounted() {
        if (localStorage.getItem("formValues")) {
            this.formValues = JSON.parse(localStorage.getItem("formValues"));
        }
        if (localStorage.getItem("tags")) {
            this.selectOption = JSON.parse(localStorage.getItem("tags"));
            this.options = this.selectOption.map(item => {
                return {
                    value: item,
                    label: item,
                };
            });
        }
        let _this = this;
        document.onkeydown = ()=> {
            if (this.$route.path === '/sysadmin/publish') {
                if(this.formValues) {
                    _this.resetTime();
                } 
            }
        };
        // document.onclick = ()=> {
        //     if (this.$route.path === '/sysadmin/publish') {
        //         if(this.formValues) {
        //             _this.resetTime();
        //         } 
        //     }
        // }
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


