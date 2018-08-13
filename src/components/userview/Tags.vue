<template>
    <div id="tags">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <h1 class="title">标签</h1>
                        <hr>
                        <div class="tags">
                            <span class="tag is-medium" v-for="(item, index) in tags" :key="index" @click="redirect2TagArticle(item.id)">{{item.tag}}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            tags: []
        }
    },
    methods: {
        //点击标签跳转到tag_articles页面
        redirect2TagArticle(val) {
            this.$router.push({path: 'tag_articles', query: {tag_id: val}});
        },

        //获取所有的标签
        getAllTags() {
            axios.get('http://127.0.0.1:5000/tags')
            .then((response) => {
                this.tags = response.data.data.tags;
            })
            .catch((error) => {
                this.$Message.error({
                    content: '出现异常！异常原因： ' + error,
                    duration: 2
                });
            })
        }
    },
    mounted() {
        this.getAllTags();
    }
}
</script>
<style scoped>
.tag {
    cursor: pointer;
}
#tags {
    min-height: 740px;
}
</style>


