<template>
     <div class="modal" :class="{'is-active': showSearchPage}">
            <div class="modal-background" @click="hideSearchPage"></div>   
            <div class="modal-card">
                <button class="delete is-large is-pulled-right is-hidden-tablet" aria-label="close" @click="hideSearchPage"></button>
                
                <section class="modal-card-body">
                    <div class="field is-grouped">
                        <div class="control has-icons-left has-icons-right is-expanded">
                            <input class="input" type="text" v-model="search_params" @keyup.enter="search" placeholder="请输入要查询的内容">
                            <span class="icon is-left">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="control">
                            <button class="button is-primary" @click="search">查找</button>
                        </div>
                    </div>
                    <div class="box" :class="{height:resultHeight}">
                        <div class="content">
                            <p class="image" v-if="showResultImg">
                                <img src="../../assets/back.jpg">
                            </p>
                            <div
                                v-for="(article, index) in articles" :key="index"
                                @click="redirect2DetailArticle(article.id)" class="detail-article">
                                <h1 class="title is-5">{{article.title}}</h1>
                                <p class="hide-content" v-html="htmlToText(compiledMarkdown(article.content))"></p>
                                <hr>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <button class="modal-close is-large is-hidden-mobile" 
            aria-label="close" 
            @click="hideSearchPage"
            ></button>
        </div>
</template>
<script>
import axios from 'axios'
import Encrypt from '../../util/encrypt.js'
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
            showSearchPage: this.showPage,
            resultHeight: '',
            showClip: false,
            search_params: '',
            articles: [],
            showResultImg: true
        }
    },
    methods: {
        redirect2DetailArticle(val) {
            this.$router.push({path:'/detail_article', query: {article_id: val, from: 'search'}});
            this.hideSearchPage();
        },
        hideSearchPage() {
            this.search_params = '';
            this.showClip = false;
            this.showSearchPage = false;
        },
        //依据输入字符串查询数据
        search() {
            let data = {
                'search_params': this.search_params
            }
            let params = {
                params: Encrypt.encrypt(JSON.stringify(data))
            }
            axios.get(process.env.API_HOST + '/search_articles', {
                params: params
            })
            .then((response) => {
                let data = response.data.data;
                if (data.articles.length == 0) {
                    this.showPage = true;
                    this.articles = [];
                    this.showResultImg = true;
                } else {
                    this.showResultImg = false;
                    this.articles = data.articles;
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
    props: [
        'showPage'
    ],
    watch: {
        showPage(val) {
            if (val == true) {
                this.showClip = true;
            }
            this.showSearchPage = val;
        },
        showSearchPage(val) {
            this.$emit("on-result-change",val);
        },
        showClip: {
            handler: function (newVal, oldVal) {
                if (newVal == true) {
                    document.body.classList.add('is-clipped');
                } else {
                    document.body.classList.remove('is-clipped');
                }
            }
        }
    }
}
</script>
<style scoped>
.modal-card {
    border-radius: 10px
}

.detail-article{
  cursor: pointer
}
/* 隐藏多余文字 */
.hide-content {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;	
  -webkit-line-clamp: 4;	
  -webkit-box-orient: vertical;
}
</style>


