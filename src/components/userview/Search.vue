<template>
     <div class="modal" :class="{'is-active': showSearchPage}">
            <div class="modal-background" @click="hideSearchPage"></div>
            
            <div class="modal-card">
                <button class="delete is-large is-pulled-right is-hidden-tablet" aria-label="close" @click="hideSearchPage"></button>
                
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
                        <div class="content">
                            <p class="image">
                                <img src="../../assets/back.jpg">
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
            
            <button class="modal-close is-large is-hidden-mobile" aria-label="close" @click="hideSearchPage"></button>
        </div>
</template>
<script>
export default {
    data() {
        return {
            showSearchPage: this.showPage,
            resultHeight: '',
            showClip: false
        }
    },
    methods: {
        redirect2DetailArticle(val) {
            this.showSearchPage = false;
            this.$router.push({path: '/detail_article', query: {tag: 1}});
        },
        hideSearchPage() {
            this.showClip = false;
            this.showSearchPage = false;
        }
    },
    props: [
        'showPage'
    ],
    watch: {
        showPage(val) {
            if (val == true) {
                this.showClip = true;
            }
            this.showSearchPage = val;
        },
        showSearchPage(val) {
            this.$emit("on-result-change",val);
        },
        showClip: {
            handler: function (newVal, oldVal) {
                if (newVal == true) {
                    document.body.classList.add('is-clipped');
                } else {
                    document.body.classList.remove('is-clipped');
                }
            },
            // deep: true,
            // immediate: true
            
        }
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


