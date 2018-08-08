<template>
    <div id="detail_article">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <div class="content">
                            <div v-html="compiledMarkdown" v-highlight>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container is-fluid">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                        <a class="pagination-previous" :disabled="previousDisabled" @click="redirect2Deatil(previous)">Previous</a>
                        <a class="pagination-next" :disabled="nextDisabled" @click="redirect2Deatil(next)">Next page</a>
                    </nav>
                </div> 
            </div>   
        </section>
        <section class="section">
            <div class="container is-fluid">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <vue-disqus shortname="min-blog-1" identifier="1"  language="zh"></vue-disqus>
                </div>
                
            </div>
        </section>
    </div>
</template>
<script>
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
            content: '',
            next: '',
            previous: '',
            previousDisabled: true,
            nextDisabled: true,
            isTop: true,
            timer: null
        }
    },
    methods: {
        //获取详细文章数据
        getDetailArticle(article_id) {
            let data = {
                article_id: article_id
            }
            let params = {
                params: Encrypt.encrypt(JSON.stringify(data))
            }
            let _this = this;
            //ajax请求获取数据
            axios.get('http://127.0.0.1:5000/detail_article',{
                params: params
            }).then((response) => {
                let data = response.data;
                switch(data.code) {
                    case 200:
                        let result = data.data.article;
                        this.$emit('loadArticle', result);
                        this.content = result.content;
                        this.previous = result.previous == null ? null:result.previous;
                        this.previousDisabled = result.previous == null ? true:false;
                        this.next = result.next == null ? null:result.next;
                        this.nextDisabled = result.next == null ? true : false;

                            
                        break;
                    default:
                }
            }).catch((error) => {
                // _this.$Message.eror({
                //     content:  "处理数据出现问题： " + error,
                //     duration: 2
                // });
                console.log(error)
            })
        },
        redirect2Deatil(article_id) {
            this.$router.push({path: 'detail_article', query: {article_id: article_id}});
            this.getDetailArticle(article_id);
            // document.body.scrollTop = 0
            // document.documentElement.scrollTop = 0
            this.timer = setInterval(() =>{
                console.log(1)
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                var ispeed = Math.floor(-osTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                if(osTop == 0 ){
                    clearInterval(this.timer)
                }
                this.isTop = true
            },30)
        }
    },
    mounted() {
        //页面初始化时向后端请求数据
        let article_id = this.$route.query.article_id;
        this.getDetailArticle(article_id);

        document.onscroll = ()=> {
            console.log(2)
            if (!this.isTop) {
                console.log(false)
                clearInterval(this.timer)
            }
            this.isTop = false
        }
    },
    destroyed() {
        let result = {
            title: '首页标题',
            desc: '',
            tags: [],
            publish_time: ''
        }
        this.$emit('loadArticle', result);
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.content, { sanitize: true })
        }
    }
}
</script>
<style scoped>
#detail_article {
    min-height: 740px;
}
code {
    font-family: Monaco, Andale Mono, Courier New, monospace;
    font-size: 28px
}
</style>


