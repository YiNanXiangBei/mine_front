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
                        <p slot="title" @click="detailArtice(article.id)" style="cursor: pointer">
                            <Icon type="compose"></Icon>
                            {{ article.title }}
                        </p>
                        
                        <a href="javascript:void(0)" slot="extra">
                            {{ article.datetime }}
                        </a>
                        <span slot="extra" @click="deleteArticle(article.title, article.id)" style="cursor: pointer; text-align: center; vertical-align: middle; margin-left: 20px">
                            <Icon type="trash-b" size="18"></Icon>
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
        <Page :total="total" :page-size=7 v-show="showPage" @on-change="research" style="text-align: center; padding-bottom: 15px"></Page>
        <Modal
            v-model="showmodal"
            title="您将删除这一篇文章以及这篇文章的相关评论，请确认这篇文章的标题"
            @on-ok="validateTitle">
            <Input v-model="tagTitle" type="text"></Input>
        </Modal>
    </div>    
</template>
<script>
import axios from 'axios'
const qs = require('qs')
export default {
    data() {
        return {
            showPage: false,
            articleId: '',
            currentTitle: '',
            showmodal: false,
            tagTitle: '',
            total: 0,
            articles: [
                
            ],
            formValues: {
                beginTime: '',
                endTime: '',
                pageNo: 1
            }
        }
    },
    methods: {
        //跳转到子组件页面
        detailArtice(value) {
            //设置articleid 到全局
            localStorage.setItem("article_id", value);
            this.$router.push({path: 'editArticle'});
        },
        //查询数据
        search() {
            axios.get(process.env.API_HOST + '/sysadmin/oldArticles',{
                params: this.formValues,
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            }).then((response) => {
                this.total = response.data.data.total;
                this.handleResult(response.data);

            }).catch((error) => {
                this.$Message.eror({
                   content:  "处理数据出现问题： " + error,
                   duration: 2
                });
            })
        },
        //查询后面的页数数据
        research(number) {
            this.formValues.pageNo = number;
            this.search();
        },
        //修改查询条件
        changeDate(value) {
            this.formValues.beginTime = value[0];
            this.formValues.endTime = value[1];
            this.formValues.pageNo = 1;

        },
        /**
         * 删除文章
         */
        deleteArticle(title, id) {
            this.showmodal = true;
            this.currentTitle = title;
            this.articleId = id;
        },
        /**
         * 验证删除条件
         */
        validateTitle() {
            if (this.currentTitle === this.tagTitle.trim()) {
                axios.delete(process.env.API_HOST + '/sysadmin/article',{
                    params: {
                        article_id: this.articleId
                    },
                    headers: {
                        Authorization: sessionStorage.getItem('token')
                    }
                }).then((response) => {
                    this.handleResult(response.data);
                    this.search();
                    this.$Message.success("文章删除成功！")
                }).catch((error) => {
                    this.$Message.eror({
                        content:  "处理数据出现问题： " + error,
                        duration: 2
                    });
                })
                
            } else {
                this.$Message.warning({
                   content:  "目标标题与输入的标题不匹配，删除失败！",
                   duration: 2
                });
            }
            this.tagTitle = "";
        },
        /**
         * 处理返回数据
         */
        handleResult(data) {
            switch(data.code) {
                case 200:
                    if (data.data.articles != undefined) {
                        this.articles = data.data.articles;
                        this.showPage = true;
                    } 
                    this.$store.commit('set_token', data.data.token);
                    break;
                case 400:
                    //处理数据失败
                    this.$Message.error({
                        content: '处理数据失败！',
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


