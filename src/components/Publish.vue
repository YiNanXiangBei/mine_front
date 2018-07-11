<template>
    <div id="publish">
        <Row>
            <Col span="18" offset="3">
                <label for="">标题：</label>
                <Input size="large" type="text" :autosize='true' :autofocus='true'></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="18" offset="3">
                <label for="">描述：</label>
                <Input size="large" type="text" :autosize='true'></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="18" offset="3">
                <label for="">标签：</label>
                <Select
                    v-model="model14"
                    multiple
                    filterable
                    remote
                    :remote-method="remoteMethod2"
                    :loading="loading2"
                    size="large">
                    <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="18" offset="3">
                <label for="">内容：</label>
                <mavon-editor placeholder="开始编辑" style="z-index:0"></mavon-editor>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="3" offset="3">
                <Button type="success" size="large" long>发布</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            model14: [],
            loading2: false,
            options2: [],
            list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
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
                            label: item
                        };
                    });
                    this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.options2 = [];
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


