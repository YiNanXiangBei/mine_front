<template>
    <div id="articles">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns is-multiline">
                    <div class="column is-four-fifths">               
                        <div class="columns">
                            <div class="column is-offset-one-fifth is-four-fifths">
                                <section class="section">
                                    <div class="content" v-for="(article, index) in articles" :key="index">
                                        <router-link 
                                            :to="{path: '/detail_article', query: {article_id: article.id}}" 
                                            class="detail-article"
                                            >
                                            <h3 class="title is-spaced">{{article.title}}</h3>
                                            <h5 class="subtitle is-6">{{article.desc}}</h5>
                                            <p class="hide-content is-italic" v-html="htmlToText(compiledMarkdown(article.content))">
                                                
                                            </p>
                                           
                                        </router-link>
                                        <p></p>
                                         <p class="post-meta is-italic">{{article.publish_time}}</p>
                                        <hr>
                                    </div>
                                </section>
                                <section class="section">
                                    <page @onChange="getAllArticles" :total="total" v-if="showPage"></page>
                                    <h4 class="title is-4" v-if="showTip">这个家伙很懒没有写过文章！</h4>
                                </section>
                            </div>
                        </div>    
                    </div>
                    <div class="column is-hidden-mobile">
                        <section class="section hot-content">
                            <div class="box">
                                <h3 class="title is-6">最热文章</h3>
                                <p v-for="(article, index) in topArticles"
                                :key="index"
                                :style="{'font-size':'13px'}">
                                {{index + 1}}.
                                    <router-link 
                                    :to="{path: '/detail_article', query: {article_id: article.id}}"
                                    >{{article.title}}</router-link>
                                </p>
                                
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        </section>
    </div>
</template>
<script>
import Page from './Page.vue'
import Encrypt from '../../util/encrypt.js'
import axios from 'axios'
import marked from 'marked'
var rendererMD = new marked.Renderer()
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})
export default {
    data() {
        return {
            total: 0,
            articles: [],
            showPage: true,
            showTip: false,
            topArticles: []
        }
    },
    methods: {
        //获取文章数据
        getAllArticles(page_no) {
            let data = {
                page: page_no
            }
            let params = {
                params: Encrypt.encrypt(JSON.stringify(data))
            }
            axios.get(process.env.API_HOST + '/index', {
                params: params
            })
            .then((response) => {
                let data = response.data.data;
                if (data == null) {
                    this.showPage = false;
                    this.showTip = true;
                } else {
                    this.showPage = true;
                    this.showTip = false;
                    this.total = data.total;
                    this.articles = data.articles;
                    this.topArticles = data.top_articles
                }
            })
            .catch((error) => {
                this.$Message.error({
                    content: '出现异常！异常原因： ' + error,
                    duration: 2
                });
            })
        },
        //markdown to html
        compiledMarkdown: function (content) {
            return marked(content, { sanitize: true })
        },
        //html to txt
        htmlToText(html) {
            return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
        }
    },
    components: {
        page: Page
    },
    mounted() {
        this.getAllArticles(1);
    }
}
</script>
<style scoped>
.detail-article{
    cursor: pointer;
}
articles {
    min-height: 740px;
}


.hide-content {
    color: #a3a3a3; 
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;	
    -webkit-line-clamp: 4;	
    -webkit-box-orient: vertical; 
}

.hot-content {
    padding: 3rem 0;
}
</style>


