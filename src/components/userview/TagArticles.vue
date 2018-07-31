<template>
  <div id="tag_articles">
    <section class="section">
      <div class="container is-fullhd">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
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
.image{
  cursor: pointer
}
strong {
  cursor: pointer
}
</style>
