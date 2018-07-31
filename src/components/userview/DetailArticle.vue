<template>
    <div id="detail_article">
        <section class="section">
            <div class="container is-fullhd">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <div class="content">
                            <h2 class="title is-2 ">段落小标题(都是使用markdown进行渲染)</h2>
                            <p>段落内容</p>
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
export default {
    data() {
        return {
            articles: {
                title: '',
                desc: '',
                tags: '',
                auth: ''
            }
        }
    },
    methods: {

    },
    mounted() {
        this.articles.title = '';
        this.articles.desc = '';
        this.articles.tags = '';
        this.articles.time = '';
        localStorage.setItem('title', '钢铁是怎样炼成的');
        localStorage.setItem('desc', '钢铁冶炼技术指南');
        localStorage.setItem('tags', JSON.stringify(['冶金', '炼铁', '挖矿', '淘沙', '烧火', '真的想不出了', '还有两个', '还有一个', '还有0个']));
        localStorage.setItem('auth', 'Posted by Les1ie on June 6, 2018')
    }
}
</script>
<style scoped>
#detail_article {
    min-height: 740px;
}

</style>


