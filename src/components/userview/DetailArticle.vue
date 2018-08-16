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
                    <div class="column is-one-fifths">
                        <div class="content">
                            <p>目录</p>
                            <div v-for="(item, index) in headlines">
                                <p :style="{'text-indent': firstLineIndent(item.level)}">
                                    <a href="javascript:void(0)" @click="goAnchor('#'+item.slug)">{{item.title}}</a>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" v-if="showPagination">
            <div class="container is-fluid">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                        <a class="pagination-previous" :disabled="previousDisabled" @click="redirect2Deatil(previous)">Previous</a>
                        <a class="pagination-next" :disabled="nextDisabled" @click="redirect2Deatil(next)">Next page</a>
                    </nav>
                </div>
            </div>   
        </section>
        <section class="section" v-show="showDisqus">
            <div class="container is-fluid">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <vue-disqus v-if="hackReset" shortname="min-blog-1" :identifier="articleId"   language="zh"></vue-disqus>
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
            timer: null,
            showPagination: true,
            articleId: '',
            hackReset: false,
            showDisqus: false,
            headlines: []
        }
    },
    methods: {
        //获取详细文章数据
        getDetailArticle(article_id) {
            //验证能否加载disqus
            this.validateDisqus()
            //强制下一次重新渲染组件
            if (this.showDisqus) {
                this.hackReset = false;
                this.$nextTick(() => {
                    this.hackReset = true
                });
            }
            this.articleId = article_id.toString();
            let data = {
                article_id: article_id
            }
            let params = {
                params: Encrypt.encrypt(JSON.stringify(data))
            }
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
                        this.showPagination = true;
                        break;
                    default:
                        this.showPagination = false;
                }
            }).catch((error) => {
                this.$Message.error({
                    content: '出现异常！异常原因： ' + error,
                    duration: 2
                });
            })
        },
        redirect2Deatil(article_id) {
            this.$router.push({path: 'detail_article', query: {article_id: article_id}});
            this.getDetailArticle(article_id);
        },
        //验证disqus是否可以访问，如果允许访问则加载，否则不允许加载
        validateDisqus() {
            axios.get('//disqus.com/next/config.json?' + + new Date().getTime(), {
                timeout: 2000
            })
            .then((response) => {
                this.showDisqus = true;
                this.hackReset = true;
            })
            .catch((error) => {
                this.hackReset = false;
                this.showDisqus = false;
            })
        },
        //回调将toc数组传给headlines
        tocToTree(tocs) {
            this.headlines = tocs;
        },
        //点击文章年份跳转指定年份文章位置
        goAnchor(selector) {
            document.querySelector(selector).scrollIntoView();  
        },
        //依据markdown文本自动生成目录树，并定位锚点
        firstLineIndent(level) {
            return (level - 1) + 'rem'
        }
    },
    mounted() {
        //页面初始化时向后端请求数据
        let article_id = this.$route.query.article_id;
        this.getDetailArticle(article_id);
    },
    destroyed() {
        let result = {
            title: '长路漫漫',
            desc: '',
            tags: [],
            publish_time: '',
            back_url: 'http://127.0.0.1:5000/image/1534261401.webp'
        }
        this.$emit('loadArticle', result);
    },
    computed: {
        compiledMarkdown: function () {
            let toc = [];
            let endPadd = 1;
            rendererMD.heading = function(text, level) {
                var slug = 'anchor' + text.toLowerCase().replace(/[^\w]+/g, 'anchor') + endPadd;
                endPadd += 1;
                toc.push({
                    level: level,
                    slug: slug,
                    title: text
                });
                return "<h" + level + " id=\"" + slug + "\"><a href=\"javascript:void(0)" + "\" class=\"anchor\"># </a>" + text + "</h" + level + ">";
            };
            return marked(this.content, { sanitize: true, renderer: rendererMD}, (err, content) => {
                this.tocToTree(toc)
                return content;
            });
        }
    },
    watch: {
        // '$route'(to, from) {
        //     if (to.query.from) {
        //         console.log(1)
        //         this.redirect2Deatil(to.query.article_id)
        //     }
        // }
    }
}
</script>
<style scoped>
@font-face {
    font-family: 'Hiragino Sans GB';
    src: url('../../../static/font/Hiragino-Sans-GB-W3.otf');
}
@font-face {
    font-family: 'Monaco';
    src: url('../../../static/font/Monaco.ttf');
}
#detail_article {
    min-height: 740px;
}
.content {
    font-family: Arial, "Hiragino Sans GB", 冬青黑, "Microsoft YaHei", 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, "Arial sans-serif";
}
</style>


