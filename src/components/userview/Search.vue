<template>
     <div class="modal" :class="{'is-active': showSearchPage}">
            <div class="modal-background" @click="hideSearchPage"></div>
            
            <div class="modal-card">
                <button class="delete is-large is-pulled-right is-hidden-tablet" aria-label="close" @click="hideSearchPage"></button>
                
                <section class="modal-card-body">
                    <div class="field is-grouped">
                        <div class="control has-icons-left has-icons-right is-expanded">
                            <input class="input" type="text" v-model="search_params" placeholder="请输入要查询的内容">
                            <span class="icon is-left">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="control">
                            <button class="button is-primary" @click="search">提交</button>
                        </div>
                    </div>
                    <div class="box" :class="{height:resultHeight}">
                        <div class="content">
                            <!-- <p class="image" v-if="showResultImg">
                                <img src="../../assets/back.jpg">
                            </p> -->
                            <div
                                v-for="(article, index) in articles"
                                :key="index" 
                                @click="redirect2DetailArticle(article.id)" class="detail-article">
                                <h1 class="title">{{article.title}}</h1>
                                <p>{{article.content}}</p>
                                <hr>
                            </div>
                            <div>
                                <p v-for="(article, index) in articles" :key="index">
                                    {{article.title}}
                                </p>
                            </div>
                            <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div>
                           <!--  <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div>
                            <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div>
                            <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div>
                            <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div>
                            <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div> -->
                        </div>
                    </div>
                </section>
            </div>
            
            <button class="modal-close is-large is-hidden-mobile" aria-label="close" @click="hideSearchPage"></button>
        </div>
</template>
<script>
import axios from 'axios'
import Encrypt from '../../util/encrypt.js'
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
            this.showSearchPage = false;
            this.$router.push({path: '/detail_article', query: {article_id: val}});
        },
        hideSearchPage() {
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
            axios.get('http://127.0.0.1:5000/search', {
                params: params
            })
            .then((response) => {
                console.log(response);
                let data = response.data.data;
                if (data == null) {
                    this.showPage = true;
                } else {
                    this.showResultImg = false;
                    this.articles = data;
                    console.log(this.articles)
                }
                
            })
            .catch((error) => {
                console.log(error);
            })

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
</style>


