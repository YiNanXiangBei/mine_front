<template>
    <div>
        <vue-waterfall-easy :imgsArr="imgsArr" height="100px"></vue-waterfall-easy>
    </div>
    
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
const qs = require('qs')
export default {
    data() {
        return {
            imgsArr: [
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/1.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/2.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/3.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/4.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/5.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/6.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/7.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/8.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/9.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/10.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/11.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/12.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/13.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/14.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/15.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/16.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/17.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/18.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/19.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  },
  {
    "src": "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/20.jpg",
    "href": "https://www.baidu.com",
    "info": "一些图片描述文字"
  }
],
            group: 0, // request param
        }
    },
    methods: {
        getData() {
            axios.get('https://lfyfly.github.io/vue-waterfall-easy/demo/static/mock/data.json?group=' + this.group) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个惊呆json文件模拟
                .then(res => {
                    console.log(res)
                // this.imgsArr = this.imgsArr.concat(res.data)
                this.group++
            })
        }
    },
    components: {
        vueWaterfallEasy
    },

}
</script>

<style scoped>

</style>
