<template>
    <div id="preview-detail">
        <!-- 大图片背景 -->
        <section class="hero is-primary is-medium is-bold" :style="backgroundImg">
            <div class="hero-head">
                <nav class="navbar is-transparent">
                    <div class="container is-fluid">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <img src="../../static/white_title.png" alt="Yinan">
                            </a>
                            <span class="navbar-burger burger" :class="{'is-active': isActive}" data-target="navbarMenuHeroA" @click="isActive = !isActive">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenuHeroA" class="navbar-menu" :class="{'is-active': isActive}">
                            <div class="navbar-end">
                                <router-link to="#" class="navbar-item">首页</router-link>
                                <router-link to="#" class="navbar-item">归档</router-link>
                                <router-link to="#" class="navbar-item">标签</router-link>
                                <router-link to="#" class="navbar-item">关于</router-link>
                                <a class="navbar-item">  
                                    <span class="icon">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="hero-body">
                <div class="container is-fluid has-text-justified">
                    <h1 class="title is-1 is-spaced">
                        {{ article.title }}
                    </h1>
                    <h2 class="subtitle">
                        {{ article.desc }}
                    </h2>
                    <!-- <h6 class="subtitle is-6 is-italic">{{ article.auth }}</h6> -->
                    <div class="tags">
                        <span class="tag" :class="[randomClass(index)]" v-for="(item, index) in tags" :key="index">{{item.tag}}</span>
                    </div>
                </div>
            </div>
        </section>
        <!-- 内容展示 -->
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
                        <div class="box">
                            <h3 class="title is-6">文章目录</h3>
                            <div v-for="(item, index) in headlines">
                                <p :style="{'text-indent': firstLineIndent(item.level), 'font-size':'13px'}">
                                    <a href="javascript:void(0)" @click="goAnchor('#'+item.slug)">{{item.title}}</a>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 尾部 -->
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                        <strong>Mine Blog</strong> by <a href="https://github.com/YiNanXiangBei">YiNanXiangBei</a> and <a href="https://github.com/Jasbeauty">Jasmine</a>. The source code is licensed
                        <a href="https://github.com/YiNanXiangBei/mine_front/blob/master/LICENSE">Apache-2.0</a>.
                    </p>
                </div>
            </div>
        </footer>
        <BackTop></BackTop>
    </div>
</template>
<script>
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
            isActive: false,
            article: {
                title: '',
                desc: '',
                content: '',
                back_img: '',
                
            },
            tags: []
        }
    },
    methods: {
        //随机生成标签样式
        randomClass(index) {
            let colorArr = ['is-dark', 'is-light', 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'];
            return colorArr[index % 8];
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
    computed: {
      backgroundImg () {
        let pic = `url(${this.article.back_img}) no-repeat center center  / cover`
        return {
          background: pic
        }
      },
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
            rendererMD.image = function (href, title, text) {
                return "<p style=\"padding: 17.5px 21px 17.5px 21px\"><img src=\"" + href + "\"" + " alt=\"" + text + "\"></p>"
            };
                
            return marked(this.article.content, { sanitize: true, renderer: rendererMD}, (err, content) => {
                this.tocToTree(toc)
                return content;
            });
        }
    },
    mounted() {
        if (localStorage.getItem("formValues")) {
            this.article = JSON.parse(localStorage.getItem("formValues"));
            console.log(this.article)
        }
        if (localStorage.getItem("tags")) {
            let selectOption = JSON.parse(localStorage.getItem("tags"));
            this.tags = selectOption.map(item => {
                return {
                    tag: item
                }
            });
            console.log(this.tags)
        }
    },
    destroyed() {
        if (localStorage.getItem("formValues")) {
            localStorage.removeItem("formValues");
        }
        if (localStorage.getItem("tags")) {
            localStorage.removeItem("tags");
        }
    }
}
</script>
<style scoped>
@font-face {
    font-family: 'Hiragino Sans GB';
    src: url('../../static/font/Hiragino-Sans-GB-W3.otf');
}
@font-face {
    font-family: 'Monaco';
    src: url('../../static/font/Monaco.ttf');
}
#preview-detail {
    min-height: 740px;
}
.content {
    font-family: Arial, "Hiragino Sans GB", 冬青黑, "Microsoft YaHei", 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, "Arial sans-serif";
}
</style>


