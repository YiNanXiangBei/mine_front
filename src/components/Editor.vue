<template>
    <div id="edit">
        <Form :model="formValues">
            <Row>
                <Col span="10" offset="3">
                    <FormItem label="日期">
                        <DatePicker @on-change="changeDate" v-model="formValues.datetime"  format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 100%"></DatePicker>                    
                    </FormItem>
                </Col>     
            </Row>
            <Row>
                <Col span="2" offset="3">
                    <Button type="success" long @click="search">查询</Button>
                </Col>
            </Row>     
        </Form>
        <br>
        <div v-for="(article, index) in articles" :key="index">
            <Row>
                <Col span="18" offset="3">
                    <Card style="width:100%">
                        <p slot="title" @click="detailArtice" style="cursor: pointer">
                            <Icon type="compose"></Icon>
                            {{ article.title }}
                        </p>
                            <a href="#" slot="extra">
                            {{ article.datetime }}
                        </a>
                        <p>
                            <Tag color="#A569BD" v-for="(tag, ind) in article.tags" :key="ind"> {{ tag.value }} </Tag>
                        </p>
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
            articles: [
                {
                    title: '今天是个好日子',
                    tags: [
                        {
                            value: '吃'
                        },
                        {
                            value: '喝'
                        },
                        {
                            value: '睡'
                        }
                    ],
                    datetime: '2018/02/06'
                },
                {
                    title: '今天天气不好',
                    tags: [
                        {
                            value: '吃'
                        },
                        {
                            value: '睡'
                        }
                    ],
                    datetime: '2018/07/12'
                }
            ],
            formValues: {
                beginTime: '',
                endTime: ''
            }
        }
    },
    methods: {
        detailArtice(value) {
            this.$Message.info('detail article');
        },
        search() {
            this.$Message.info(this.formValues.beginTime + ',' + this.formValues.endTime);
        },
        changeDate(value) {
            this.formValues.beginTime = value[0]
            this.formValues.endTime = value[1]
            this.$Message.info(this.formValues.beginTime + ',' + this.formValues.endTime);
        }
    }
}
</script>
<style scoped>
#edit{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 50px
}
</style>


