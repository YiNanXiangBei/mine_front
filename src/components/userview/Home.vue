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
                        <!-- <a class="navbar-item">
                            
                            <i class="fa-search"></i>
                        
                        </a> -->
                        <router-link to="/search" class="navbar-item">
                            <i class="fa-search"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
        <!-- 大图片 -->
        <section class="hero is-primary is-large">
            <div class="hero-head" v-show="showHeroHead">
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
                                <router-link to="/search" class="navbar-item">
                                    <i class="fa-search"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="hero-body">
                <div class="container is-fluid">
                    <h1 class="title">
                        Medium title
                    </h1>
                    <h2 class="subtitle">
                        Medium subtitle
                    </h2>
                </div>
            </div>
        </section>
        <!-- 内容区域 -->
        <router-view></router-view>
        <!-- <section class="section">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">

                    </div>
                </div>
            </div>
        </section> -->

        
         
        
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            showHeader: false,
            showHeroHead: true,
            scrollTop: 0,
            isActive: false,
        }
    },
    methods: {
        pageJump(path) {
            this.$router.push({path: path})
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
                    _this.showHeroHead = true;
                    _this.showHeader = false;
                } else {
                    _this.showHeroHead = false;
                    _this.showHeader = true;
                }
            }
            _this.scrollTop = document.documentElement.scrollTop;
        };
    }
}
</script>
<style scoped>
.home-navbar-header {
    opacity:0.8;
    filter:alpha(opacity=80);
}
#home{
    height: 2000px;
}
.post-meta {
    font-family: Lora,'Times New Roman',serif
}
</style>


