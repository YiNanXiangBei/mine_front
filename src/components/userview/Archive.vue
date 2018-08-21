<template>
    <div id="archive">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <h1 class="title">归档</h1>
                        <hr>
                        <div>
                            <div v-for="(archive, index) in archives" :key="index" class="content" :id="'archive-'+index">
                                <h4>{{archive.publish_date}}</h4>
                                <ul v-for="(article, ind) in archive.articles" :key="ind">
                                    <li>
                                        <router-link 
                                        :to="{path: '/detail_article', query: {article_id: article.id}}"
                                        >{{article.title}}</router-link>
                                        ({{article.publish_time}})
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="content is-hidden-mobile">
                            <p>
                                目录
                            </p>
                            <ul>
                                <li v-for="(archive, index) in archives" :key="index">
                                    <a href="javascript:void(0)" @click="goAnchor('#archive-'+index)">{{archive.publish_date}}</a>
                                </li>                            
                            </ul>
                        </div> 
                    </div>
                </div>
                <h4 class="subtitle is-4" v-if="showTip">没有找到相关文章！</h4>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            archives: [],
            showTip: false
        }
    },
    mounted() {
        //初始化背景图片和标题
        let result = {
            title: '长路漫漫',
            desc: '',
            tags: [],
            publish_time: '',
            back_url: process.env.API_HOST + '/image/1534261401.webp'
        }
        this.$emit('loadArticle', result);
        //获取后台数据
        axios.get(process.env.API_HOST + '/archive')
            .then((response) => {
                let data = response.data.data;
                if (data == null) {
                    this.showTip = true;
                } else {
                    this.archives = data;
                    this.showTip = false;
                }

            })
            .catch((error) => {
                this.$Message.error({
                    content: '出现异常！异常原因： ' + error,
                    duration: 2
                });
            })
    },
    methods: {
        //点击文章年份跳转指定年份文章位置
        goAnchor(selector) {
            document.querySelector(selector).scrollIntoView();  
        }
    }
}
</script>
<style scoped>
#archive {
    min-height: 740px;
}
</style>


