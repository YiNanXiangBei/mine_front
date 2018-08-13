<template>
    <div id="home">
        <!-- 头部 -->
        <nav class="navbar is-fixed-top home-navbar-header" role="navigation" aria-label="main navigation" v-show="showHeader">
            <div class="container is-fluid">
                <div class="navbar-brand">
                    <a class="navbar-item" href="http://127.0.0.1:8080/index">
                    <img src="../../../static/black_title.png" alt="Yinan" width="112" height="28">
                    </a>
                    <div class="navbar-burger" :class="{'is-active': isActive}" @click="isActive = !isActive">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-menu" :class="{'is-active': isActive}">
                    <div class="navbar-end">
                        <router-link to="/index" class="navbar-item">首页</router-link>
                        <router-link to="/archive" class="navbar-item">归档</router-link>
                        <router-link to="/tags" class="navbar-item">标签</router-link>
                        <router-link to="/about" class="navbar-item">关于</router-link>
                        <a class="navbar-item" @click="showSearchPage = true">  
                            <span class="icon">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <!-- 大图片 -->
        <section class="hero is-primary is-medium is-bold" :style="{backgroundSize: 'cover', background: 'url(' + articles.backImg + ')'}">
            <div class="hero-head">
                <nav class="navbar is-transparent">
                    <div class="container is-fluid">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <img src="../../../static/white_title.png" alt="Yinan">
                            </a>
                            <span class="navbar-burger burger" :class="{'is-active': isActive}" data-target="navbarMenuHeroA" @click="isActive = !isActive">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenuHeroA" class="navbar-menu" :class="{'is-active': isActive}">
                            <div class="navbar-end">
                                <router-link to="/index" class="navbar-item">首页</router-link>
                                <router-link to="/archive" class="navbar-item">归档</router-link>
                                <router-link to="/tags" class="navbar-item">标签</router-link>
                                <router-link to="/about" class="navbar-item">关于</router-link>
                                <a class="navbar-item" @click="showSearchPage = true">  
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
                        {{ articles.title }}
                    </h1>
                    <h2 class="subtitle">
                        {{ articles.desc }}
                    </h2>
                    <h6 class="subtitle is-6 is-italic">{{ articles.auth }}</h6>
                    <div class="tags">
                        <span class="tag" :class="[randomClass(index)]" v-for="(item, index) in articles.tags" :key="index" @click="redirect2TagArticle(item.id)">{{item.tag}}</span>
                    </div>
                </div>
            </div>
        </section>
        <!-- 内容区域 -->
        <router-view @loadArticle="loadArticle"></router-view>
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
        <!-- 子组件事件 -->
        <search :showPage="showSearchPage" @on-result-change="onResultChange"></search>
        <BackTop></BackTop>
    </div>
</template>
<script>
import Search from './Search'
export default {
    data() {
        return {
            showHeader: false,
            scrollTop: 0,
            isActive: false,
            showSearchPage: false,
            articles: {
                title: '首页标题',
                desc: '',
                tags: '',
                auth: '',
                backImg: 'http://127.0.0.1:5000/image/1534128522.webp'
            }
        }
    },
    methods: {
        //展示搜索页面
        onResultChange(val) {
            this.showSearchPage = val;
        },
        //随机生成标签样式
        randomClass(index) {
            let colorArr = ['is-dark', 'is-light', 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'];
            return colorArr[index % 8];
        },
        //点击标签跳转到tag_articles页面
        redirect2TagArticle(val) {
            this.$router.push({path: 'tag_articles', query: {tag_id: val}});
        },
        //从子页面获取数据
        loadArticle(article) {
            this.articles.title = article.title;
            this.articles.desc = article.desc;
            this.articles.tags = article.tags;
            this.articles.auth = article.publish_time
        }
        
    },
    mounted() {
        //页面为/则直接跳转到/index
        let path = this.$route.path;
        if (path === '/') {
            this.$router.replace({path: '/index'})
        }
        let _this = this;
        document.onscroll= ()=> {
            let pageOffset = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (pageOffset > _this.scrollTop) {
                _this.showHeader = false;
            } else {
                if (pageOffset === 0) {
                    _this.showHeader = false;
                } else {
                    _this.showHeader = true;
                }
            }
            _this.scrollTop = pageOffset;
        };
    },
    components: {
        search: Search
    }
}
</script>
<style scoped>
.home-navbar-header {
    opacity:0.8;
    filter:alpha(opacity=80);
}
.post-meta {
    font-family: Lora,'Times New Roman',serif
}
.tag {
    cursor: pointer;
    
}
</style>


