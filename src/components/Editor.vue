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
                        <span @click="deleteArticle" style="position: absolute; right: 15px; cursor: pointer">
                            <Icon type="trash-b" size="20"></Icon>
                        </span>
                        <p>
                            <Tag color="#A569BD" v-for="(tag, ind) in article.tags" :key="ind"> {{ tag }} </Tag>
                        </p>
                    </Card>
                </Col>
            </Row>
            <br>
        </div>
        <BackTop></BackTop>
        <Page :total="total" @on-change="research" style="text-align: center; padding-bottom: 15px"></Page>
    </div>    
</template>
<script>
import axios from 'axios'
const qs = require('qs')
export default {
    data() {
        return {
            total: 12,
            articles: [
                {
                    id: '',
                    title: '今天是个好日子',
                    tags: [ '吃' ,'喝', '睡'],
                    datetime: '2018/02/06'
                },
                {   
                    id: '',
                    title: '今天天气不好',
                    tags: ['吃', '睡'],
                    datetime: '2018/07/12'
                }
            ],
            formValues: {
                beginTime: '',
                endTime: '',
                pageNo: 1
            }
        }
    },
    methods: {
        //跳转到publish页面,将相关的数据要带过去
        detailArtice(value) {
            this.$Message.info('detail article');
        },
        search() {
            axios.get('http://127.0.0.1:5000/sysadmin/oldArticles',{
                params: this.formValues,
                headers: {
                    'Authorization': sessionStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response)
                this.total = response.data.data.total;
                this.detailResult(response.data);

            }).catch((error) => {
                console.log(error)
            })
        },
        research(number) {
            this.formValues.pageNo = number;
            this.search();
        },
        changeDate(value) {
            this.formValues.beginTime = value[0]
            this.formValues.endTime = value[1]
        },
        deleteArticle() {
            console.log("delete")
        },
        detailResult(data) {
            switch(data.code) {
                case 200:
                    if (data.data.articles != undefined) {
                        this.articles = data.data.articles;
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
#edit{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 50px
}
</style>


