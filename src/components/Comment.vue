<template>
    <div id="comment">
        <div v-for="(comment, index) in comments" :key="index" @click="detailComment(comment)">
            <Row>
                <Col span="18" offset="3">
                    <Card style="width:100%; cursor: pointer">
                        <div>
                                <Icon type="chatbubble-working" size="20"></Icon>
                                {{comment.title}}
                                <Badge :count="comment.count" style="position: absolute; right: 10px">
                                </Badge>
                            </div>
                    </Card>
                </Col>
            </Row>
            <br>
        </div>
        <Page :total="total" style="text-align: center"></Page>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            total: 12,
            comments: [
                {
                    title: '今天是个好天气',
                    count: 12
                },
                {
                    title: '今天天气不错',
                    count: 120
                },
                {
                    title: 'beautiful date',
                    count: 89
                },
                {
                    title: '今天天气很差',
                    count: 120
                },
                {
                    title: '今天天气太热了',
                    count: 120
                }
            ]
        }
    },
    methods: {
        detailComment(comment) {
            this.$Message.info(comment.title);
            comment.count = 0;
        }
    }
}
</script>
<style scoped>
#comment{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 50px
}
</style>


