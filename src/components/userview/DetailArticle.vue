<template>
    <div id="detail_article">
        <section class="section">
            <div class="container is-fullhd">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <div class="content">
                            <!-- <h2 class="title is-2 ">段落小标题(都是使用markdown进行渲染)</h2>
                            <p>段落内容</p> -->
                            <div v-html="compiledMarkdown">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container is-fullhd">
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
            articles: {
                title: '',
                desc: '',
                tags: '',
                auth: ''
            },
            content: ''
        }
    },
    methods: {
        
    },
    mounted() {
        //页面初始化时向后端请求数据
        // let article_id = this.$route.query.article_id;
        let article_id = 18;
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
                    _this.$emit('loadArticle', result);
                    _this.content = result.content;
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

</style>


