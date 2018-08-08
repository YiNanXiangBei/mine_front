<template>
  <div id="tag_articles">
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth" :class="{'column-style': isShow}" @mouseover="isShow = !isShow" @mouseout="isShow = !isShow">
              <router-link :to="{path: '/detail_article', query: {article_id: 17}}" tag="div" class="detail-article">
                <article class="media">
                  <figure class="media-left is-hidden-mobile">
                    <p class="image is-128x128">
                      <img src="https://lqzhgood.github.io/bulma-docs-cn/images/placeholders/128x128.png">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <strong>标题</strong>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                      </p>
                    </div>
                  </div>
                </article>
              </router-link>
              
          </div>
        </div>
        
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth" :class="{'column-style': isShow}" @mouseover="isShow = !isShow" @mouseout="isShow = !isShow">
              <article class="media">
                <figure class="media-left is-hidden-mobile">
                  <p class="image is-128x128">
                    <img src="https://lqzhgood.github.io/bulma-docs-cn/images/placeholders/128x128.png">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <strong>标题</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                    </p>
                  </div>
                </div>
              </article>
          </div>
        </div>

      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <page @onChange="getArticles"></page>
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
      isShow: false,
      page: 1
    }
  },
  methods: {
    //依靠标签id称获取该标签下所有数据
    getArticlesByTagId(tag_id, page_no) {
      let data = {
          tag_id: tag_id,
          page_no: page_no
      }
      console.log(data)
      let params = {
          params: Encrypt.encrypt(JSON.stringify(data))
      }
      axios.get('http://127.0.0.1:5000/tag_articles', {
        params: params
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    },
    //获取当前点击页面pageno
    getArticles(currentPage) {
      this.getArticlesByTagId(this.$route.query.tag_id, currentPage)
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
</style>
