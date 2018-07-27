<template>
    <div id="home">
        <nav class="navbar is-fixed-top home-navbar-header" role="navigation" aria-label="main navigation" v-show="showHeader">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://lqzhgood.github.io/bulma-docs-cn">
                <img src="https://lqzhgood.github.io/bulma-docs-cn/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
                </a>
                <div class="navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <a href="#" class="navbar-item">首页</a>
                    <a href="#" class="navbar-item">归档</a>
                    <a href="#" class="navbar-item">标签</a>
                    <a href="#" class="navbar-item">关于</a>
                    <a href="#" class="navbar-item">
                        
                        <i class="fa-search"></i>
                    
                    </a>
                </div>
            </div>
        </nav>
        <section class="hero is-primary is-medium">
            <div class="hero-head" v-show="showHeroHead">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <img src="https://lqzhgood.github.io/bulma-docs-cn/images/bulma-type-white.png" alt="Logo">
                            </a>
                            <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenuHeroA" class="navbar-menu">
                            <div class="navbar-end">
                                <a class="navbar-item is-active">
                                首页
                                </a>
                                <a class="navbar-item">
                                归档
                                </a>
                                <a class="navbar-item">
                                标签
                                </a>
                                <a class="navbar-item">
                                关于
                                </a>
                                <span class="navbar-item">
                                    <i class="fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Medium title
                </h1>
                <h2 class="subtitle">
                    Medium subtitle
                </h2>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showHeader: false,
            showHeroHead: true,
            scrollTop: 0
        }
    },
    methods: {

    },
    mounted() {
        let _this = this;
        document.onscroll= ()=> {
            if (document.documentElement.scrollTop > _this.scrollTop) {
                console.log("向下")
            } else {
                if (document.documentElement.scrollTop === 0) {
                    _this.showHeroHead = true;
                    _this.showHeader = false;
                } else {
                    _this.showHeroHead = false;
                    _this.showHeader = true;
                }
                console.log("向上")
            }
            _this.scrollTop = document.documentElement.scrollTop;
        }
    }
}
</script>
<style scoped>
.home-navbar-header {
    opacity:0.8;
    filter:alpha(opacity=80);
}
#home{
    height: 1000px;
}
</style>


