<template>
    <div id="archive">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <h1 class="title">归档</h1>
                        <hr>
                        <div>
                            <div v-for="(archive, index) in archives" :key="index" class="content" :id="'archive-'+index">
                                <h4>{{archive.publish_date}}</h4>
                                <ul v-for="(article, ind) in archive.articles" :key="ind">
                                    <li>
                                        <router-link 
                                        :to="{path: '/detail_article', query: {article_id: article.id}}"
                                        >{{article.title}}</router-link>
                                        ({{article.publish_time}})
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="content is-hidden-mobile">
                            <p>
                                年份列表
                            </p>
                            <ul>
                                <li v-for="(archive, index) in archives" :key="index">
                                    <a href="javascript:void(0)" @click="goAnchor('#archive-'+index)">{{archive.publish_date}}</a>
                                </li>                            
                            </ul>
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
            archives: []
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:5000/archive')
        .then((response) => {
            let data = response.data.data;
            if (data == null) {

            } else {
                this.archives = data;
            }

        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {
        goAnchor(selector) {
            console.log(selector)
            // var anchor = this.$el.querySelector(selector);
            // console.log(anchor)
            // document.body.scrollTop = anchor.offsetTop;
            document.querySelector(selector).scrollIntoView();  
        }
    }
}
</script>
<style scoped>
#archive {
    min-height: 740px;
}
</style>


