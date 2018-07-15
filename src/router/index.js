import Vue from 'vue'
import Router from 'vue-router'
import Comments from '@/components/Comment'
import Editor from '@/components/Editor'
import Person from '@/components/Person'
import Publish from '@/components/Publish'
import Sidebar from '@/components/Sidebar'
import Tag from '@/components/Tag'
import Upload from '@/components/Upload'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  //修改默认路由格式
  mode: 'history',
  routes: [
    {
      path: '/comment',
      name: 'comment',
      component: Comments,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/person',
      name: 'person',
      component: Person,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: Sidebar
    },
    {
      path: '/tag',
      name: 'tag',
      component: Tag,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
