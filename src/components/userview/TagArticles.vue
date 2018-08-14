<template>
  <div id="tag_articles">
    <section class="section">
      <div class="container is-fluid">
        <div class="columns" v-for="(article, index) in articles" :key="index">
          <div class="column is-three-fifths is-offset-one-fifth" 
          :class="{'column-style': showNo == index}" 
          @mouseover="onMouseover(index)" 
          @mouseout="onMouseout()">
              <router-link :to="{path: '/detail_article', query: {article_id: article.id}}" tag="div" class="detail-article">
                <article class="media">
                  <figure class="media-left is-hidden-mobile">
                    <p class="image is-128x128">
                      <img :src="article.back_url" src="http://127.0.0.1:5000/image/1534240661.webp">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <strong class="title is-5">{{article.title}}</strong>
                      <p class="hide-content is-italic" v-html="htmlToText(compiledMarkdown(article.content))">
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
            <page @onChange="getArticles" :total="total" v-if="showPage"></page>
            <h4 class="subtitle is-4" v-if="showTip">没有找到相关文章！</h4>
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
import marked from 'marked'
var rendererMD = new marked.Renderer()
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})
export default {
  data() {
    return {
      showNo: -1,
      page: 1,
      total: 0,
      articles: [],
      showTip: false,
      showPage: true
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
        let data = response.data.data;
        if (data.total == 0) {
          this.showTip = true;
          this.showPage = false;
        } else {
          this.articles = data.articles;
          this.total = data.total;
          this.showTip = false;
          this.showPage = true;
        }
      })
      .catch((error) => {
        this.$Message.error({
            content: '出现异常！异常原因： ' + error,
            duration: 2
        });
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
    },
    //markdown to html
    compiledMarkdown: function (content) {
        return marked(content, { sanitize: true })
    },
    //html to txt
    htmlToText(html) {
      return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
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
