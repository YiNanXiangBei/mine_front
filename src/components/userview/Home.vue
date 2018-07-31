<template>
    <div id="home">
        <!-- 头部 -->
        <nav class="navbar is-fixed-top home-navbar-header" role="navigation" aria-label="main navigation" v-show="showHeader">
            <div class="container is-fluid">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://lqzhgood.github.io/bulma-docs-cn">
                    <img src="https://lqzhgood.github.io/bulma-docs-cn/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
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
                        <!-- <a class="navbar-item is-active">首页</a> -->
                        <router-link to="/archive" class="navbar-item">归档</router-link>
                        <!-- <a class="navbar-item">归档</a> -->
                        <!-- <a class="navbar-item">标签</a> -->
                        <router-link to="/tags" class="navbar-item">标签</router-link>
                        <!-- <a class="navbar-item">关于</a> -->
                        <router-link to="/about" class="navbar-item">关于</router-link>
                        <a class="navbar-item" @click="showSearchPage = true">  
                            <span class="icon">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </a>
                        <!-- <router-link to="/search" class="navbar-item">
                            <span class="icon">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </router-link> -->
                    </div>
                </div>
            </div>
        </nav>
        <!-- 大图片 -->
        <section class="hero is-primary is-medium is-bold">
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container is-fluid">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <img src="https://lqzhgood.github.io/bulma-docs-cn/images/bulma-type-white.png" alt="Logo">
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
                                <!-- <router-link to="/search" class="navbar-item">
                                    <span class="icon">
                                         <i class="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </router-link> -->
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
                        <span class="tag" :class="[randomClass(index)]" v-for="(item, index) in articles.tags" :key="index" @click="redirect2TagArticle(item)">{{item}}</span>
                    </div>
                </div>
            </div>
        </section>
        <!-- 内容区域 -->
        <router-view></router-view>
        
        <!-- 尾部 -->
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                        <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                    </p>
                </div>
            </div>
        </footer>
        <search :showPage="showSearchPage" @on-result-change="onResultChange"></search>
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
                title: localStorage.getItem('title') == (''|| undefined)  ? '首页标题': localStorage.getItem('title'),
                desc: localStorage.getItem('desc') == (''|| undefined)  ? '': localStorage.getItem('desc'),
                tags: localStorage.getItem('tags') == (''|| undefined)  ? '': JSON.parse(localStorage.getItem('tags')),
                auth: localStorage.getItem('auth') == (''|| undefined)  ? '': localStorage.getItem('auth')
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
            this.$router.push({path: 'tag_articles', query: {tag: val}});
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
            if (document.documentElement.scrollTop > _this.scrollTop) {
                _this.showHeader = false;
            } else {
                if (document.documentElement.scrollTop === 0) {
                    _this.showHeader = false;
                } else {
                    _this.showHeader = true;
                }
            }
            _this.scrollTop = document.documentElement.scrollTop;
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
/* #home{
    height: 2000px;
} */
.post-meta {
    font-family: Lora,'Times New Roman',serif
}
.tag {
    cursor: pointer;
}
</style>


