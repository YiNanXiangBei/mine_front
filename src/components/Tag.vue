<template>
    <div id="tags">
        <Row>
            <Col span="16" offset="3">
                <Tag v-for="item, index in count" :key="index" :name="item" type="dot"  color="green">{{ item }}</Tag>
            </Col>
            
        </Row>
        <br>
        <Row>
            <Col offset="3">
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="modal1 = true">添加标签</Button>
            </Col>
        </Row>
        <Modal
            v-model="modal1"
            title="添加新的标签"
            @on-ok="ok">
            <Input v-model="value" placeholder="请输入新的标签名" style="width: 100%"></Input>
        </Modal>
    </div>    
</template>
<script>
export default {
    data () {
        return {
            count: ["博客", "生活", "总结", "日常"],
            modal1 : false,
            value: ''
        }
    },
    methods: {
        ok () {
            this.count.push(this.value);
            this.value = ''
            this.$Notice.success({
                title: '添加成功！'
            });
        }
    }
}
</script>
<style scoped>
#tags{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 50px
}
</style>


