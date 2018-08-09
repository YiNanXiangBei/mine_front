<template>
  <div id="tag_articles">
    <section class="section">
      <div class="container is-fluid">
        <div class="columns" v-for="(article, index) in articles" :v-for="index">
          <div class="column is-three-fifths is-offset-one-fifth" 
          :class="{'column-style': showNo == index}" 
          @mouseover="onMouseover(index)" 
          @mouseout="onMouseout()">
              <router-link :to="{path: '/detail_article', query: {article_id: article.id}}" tag="div" class="detail-article">
                <article class="media">
                  <figure class="media-left is-hidden-mobile">
                    <p class="image is-128x128">
                      <img :src="article.back_url" src="https://avatars2.githubusercontent.com/u/39959737?s=460&v=4">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <strong>{{article.title}}</strong>
                      <p class="hide-content">
                        {{article.content}}
                      </p>
                    </div>
                  </div>
                </article>
              </router-link> 
          </div>
        </div>

      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <page @onChange="getArticles" :total="total"></page>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Encrypt from '../../util/encrypt.js'
import axios from 'axios'
import Page from './Page.vue'
export default {
  data() {
    return {
      showNo: -1,
      page: 1,
      total: 0,
      articles: []
    }
  },
  methods: {
    //依靠标签id称获取该标签下所有数据
    getArticlesByTagId(tag_id, page_no) {
      let data = {
          tag_id: tag_id,
          page_no: page_no
      }
      let params = {
          params: Encrypt.encrypt(JSON.stringify(data))
      }
      axios.get('http://127.0.0.1:5000/tag_articles', {
        params: params
      })
      .then((response) => {
        console.log(response)
        this.articles = response.data.data.articles;
        this.total = response.data.data.total;
      })
      .catch((error) => {
        console.log(error)
      })

    },
    //获取当前点击页面pageno
    getArticles(currentPage) {
      this.getArticlesByTagId(this.$route.query.tag_id, currentPage)
    },
    //鼠标放上去显示阴影
    onMouseover(index) {
      this.showNo = index;
    },
    //鼠标离开恢复原样
    onMouseout() {
      this.showNo = -1;
    }
  },
  mounted() {
    let tag_id = this.$route.query.tag_id;
    this.getArticlesByTagId(tag_id, this.page);
  },
  components: {
      page: Page
  }
}
</script>
<style scoped>
.column {
  margin-bottom: 20px;
}
.column-style {
  box-shadow: 2px 2px 2px #cccccc;
  border-radius: 3px
}
.detail-article{
  cursor: pointer
}

#tag_articles {
  min-height: 740px;
}
/* 隐藏多余文字 */
.hide-content {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;	
  -webkit-line-clamp: 4;	
  -webkit-box-orient: vertical;
}
</style>
