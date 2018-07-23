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
                    <mavon-editor ref=md v-model="formValues.content" :imageClick="imageClick" placeholder="开始编辑" style="z-index: 0" @imgAdd="imgAdd" @fullScreen="fullScreen"></mavon-editor>
                </Col>
            </Row>
            <br>
            <Row v-show="showEditButton">
                <Col span="3" offset="3">
                    <FormItem>
                        <Button type="info" size="large" long @click="handleUpdate('formValues')">更新</Button>
                    </FormItem>
                </Col>
                <Col span="3" offset="1">
                    <FormItem>
                        <Button size="large" long @click="cancleUpdate">取消</Button>
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
            showEditButton: true,
            showheader: true,
            selectOption: [],
            loading: false,
            options: [],
            list: [],
            formValues: {
                title: '',
                desc: '',
                content: ''
            },
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
        /**
         * 标签查询方法
         */
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
        /**
         * 取消更新文章
         */
        cancleUpdate() {
            localStorage.removeItem("article_id");
            this.$router.push({path: "editor"});
        },
        //更新文章
        handleUpdate(name) {
            let _this = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //判断没有未填项，准备向后台传数据
                    this.$Spin.show();
                    axios({
                        method: 'put',
                        url: 'http://127.0.0.1:5000/sysadmin/article',
                        data: {
                            article_id: localStorage.getItem("article_id"),
                            tags: this.selectOption,
                            title: this.formValues.title,
                            desc: this.formValues.desc,
                            content: this.formValues.content
                        },
                        transformRequest: [function(params) {
                            //解决传递数组变成对象的问题
                            Object.keys(params).forEach((key) => {
                                if ((typeof params[key]) === 'object') {
                                    params[key] = JSON.stringify(params[key]) // 这里必须使用内置JSON对象转换
                                }
                            });
                            params = qs.stringify(params); // 这里必须使用qs库进行转换
                            return params
                        }],
                        transformResponse: [function(response) {
                            _this.$Spin.hide();
                            response = JSON.parse(response);
                            _this.detailResult(response);
                            localStorage.removeItem("article_id");
                            _this.$router.push({path: "editor"});
                        }]
                    })
                } else {
                    //有未填项，直接报错
                    this.$Message.error('更新失败!');
                }

            })
        },
        //全屏事件
        fullScreen(status, value) {
            if (status === true) {
                this.showEditButton = false;
                //向sidebar传值
                this.$emit('showheader', false);
            } else if(status === false) {
                this.showEditButton = true;
                this.$emit('showheader', true);
            }
            
        },
        // 点击图片事件
        imageClick() {
            return false;
        },
        /**
         * 标签查询
         */
        onQueryChange(value) {
            let _this = this;
            if (value != '') {
                axios.get('http://127.0.0.1:5000/sysadmin/blurry_tags', {
                    params: {
                        tag: value
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
        /**
         * 返回结果查询
         */
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
        /**
         * 图片添加
         */
        imgAdd(pos, $file) {
            let _this = this;
            var formdata = new FormData();
            console.log($file);
            formdata.append('file', $file);
            axios({
                url: 'http://127.0.0.1:5000/sysadmin/upload_image',
                method: 'post',
                data: formdata,
                headers: { 
                   'Authorization': sessionStorage.getItem('token')
                },
            }).then((response) => {
                console.log(response)
                this.detailResult(response.data, pos);
            }).catch((error) => {
                _this.$Message.error({
                    content: '上传图片出现异常： ' + error,
                    duration: 3
                });
            })
        },
        /**
         * 加载数据
         */
        loadData() {
            let _this = this;
            axios.get('http://127.0.0.1:5000/sysadmin/article', {
                params: {
                    article_id: localStorage.getItem("article_id")
                },
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            }).then(response => {
                let code = response.data.code;
                switch(code) {
                    case 200:
                        //返回数据成功
                        let article = response.data.data.article;
                        _this.options = article.tags.map(item => {
                            return {
                                value: item,
                                label: item,
                            };
                        });
                        _this.selectOption = article.tags;
                        _this.formValues.title = article.title;
                        _this.formValues.desc = article.desc;
                        _this.formValues.content = article.content;
                        _this.$store.commit('set_token', response.data.data.token);
                        break;
                    case 400:
                        //数据返回失败
                        _this.$Message.error({
                            content: '获取数据失败！',
                            duration: 2
                        })
                        break;
                    default: 
                        //token有问题
                        _this.$store.commit('del_token');
                        _this.$router.replace({path: '/sysadmin/login'});
                }
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.loadData();
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


