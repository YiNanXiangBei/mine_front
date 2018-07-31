<template>
     <div class="modal" :class="{'is-active': showSearchPage}">
            <div class="modal-background" @click="showSearchPage = false"></div>
            
            <div class="modal-card">
                <button class="delete is-large is-pulled-right is-hidden-tablet" aria-label="close" @click="showSearchPage = false"></button>
                
                <section class="modal-card-body">
                    <div class="field is-grouped">
                        <div class="control has-icons-left has-icons-right is-expanded">
                            <input class="input" type="text" placeholder="请输入要查询的内容">
                            <span class="icon is-left">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="control">
                            <button class="button is-primary">提交</button>
                        </div>
                    </div>
                    <div class="box" :class="{height:resultHeight}">
                        <div class="content" height="1000px">
                            <p class="image">
                                <img src="../../assets/back.png">
                            </p>
                            <!-- <div @click="redirect2DetailArticle(1)" class="detail-article">
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
            
            <button class="modal-close is-large is-hidden-mobile" aria-label="close" @click="showSearchPage = false"></button>
        </div>
</template>
<script>
export default {
    data() {
        return {
            showSearchPage: this.showPage,
            resultHeight: ''
        }
    },
    methods: {
        redirect2DetailArticle(val) {
            this.showSearchPage = false;
            this.$router.push({path: '/detail_article', query: {tag: 1}});
        }
    },
    props: [
        'showPage'
    ],
    watch: {
        showPage(val) {
            this.showSearchPage = val;
        },
        showSearchPage(val) {
            this.$emit("on-result-change",val);
        }
    },
    mounted() {
        this.resultHeight = document.documentElement.scrollHeight;
        console.log(this.resultHeight);
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


