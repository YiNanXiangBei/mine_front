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
                            <!-- <span class="tag is-medium">Two</span>
                            <span class="tag is-medium">Three</span>
                            <span class="tag is-medium">Four</span>
                            <span class="tag is-medium">Five</span>
                            <span class="tag is-medium">Six</span>
                            <span class="tag is-medium">Seven</span>
                            <span class="tag is-medium">Eight</span>
                            <span class="tag is-medium">Nine</span>
                            <span class="tag is-medium">Ten</span>
                            <span class="tag is-medium">Eleven</span>
                            <span class="tag is-medium">Twelve</span>
                            <span class="tag is-medium">Thirteen</span>
                            <span class="tag is-medium">Fourteen</span>
                            <span class="tag is-medium">Fifteen</span>
                            <span class="tag is-medium">Sixteen</span>
                            <span class="tag is-medium">Seventeen</span>
                            <span class="tag is-medium">Eighteen</span>
                            <span class="tag is-medium">Nineteen</span>
                            <span class="tag is-medium">Twenty</span> -->
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
                console.log(error)
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


