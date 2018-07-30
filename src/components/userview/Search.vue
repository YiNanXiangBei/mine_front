<template>
     <div class="modal" :class="{'is-active': showPage}">
            <div class="modal-background" @click="showPage = !showPage"></div>
            
            <div class="modal-card">
                <button class="delete is-large is-pulled-right is-hidden-tablet" aria-label="close" @click="showPage = !showPage"></button>
                
                <section class="modal-card-body">
                    <div class="field is-grouped">
                        <div class="control has-icons-left has-icons-right is-expanded">
                            <input class="input" type="text" placeholder="请输入要查询的内容">
                            <span class="icon is-left">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                            <span class="icon is-right">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="control">
                            <button class="button is-primary">提交</button>
                        </div>
                    </div>
                    <div class="box">
                        <div class="content">
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
                            </div>
                            <div>
                                <h1 class="title">文章标题</h1>
                                <p>文章内容</p>
                                <hr>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <button class="modal-close is-large is-hidden-mobile" aria-label="close" @click="showPage = !showPage"></button>
        </div>
</template>
<script>
export default {
    data() {
        return {
            showSearchPage: false
        }
    },
    props: [
        'showPage'
    ]
        
    
}
</script>
<style scoped>

</style>


