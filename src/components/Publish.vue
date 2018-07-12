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
                            :remote-method="remoteMethod2"
                            :loading="loading2"
                            size="large">
                            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
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

    </div>
</template>
<script>
export default {
    data () {
        return {
            showheader: true,
            showButton: true,
            selectOption: [],
            loading2: false,
            options2: [],
            list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
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
        remoteMethod2 (query) {
            if (query !== '') {
                this.loading2 = true;
                setTimeout(() => {
                    this.loading2 = false;
                    const list = this.list.map(item => {
                        return {
                            value: item,
                            label: item,
                        };
                    });
                    this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.options2 = [];
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


