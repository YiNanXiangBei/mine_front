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
import EditArticle from '@/components/EditArticle'
import PasswordFind from '@/components/PasswordFind'
import PasswordChange from '@/components/PasswordChange'
import DetailTag from '@/components/DetailTag'
import TagArticles from '@/components/userview/TagArticles'
import Home from '@/components/userview/Home'
import About from '@/components/userview/About'
import Archive from '@/components/userview/Archive'
import DetailArticle from '@/components/userview/DetailArticle'
import Search from '@/components/userview/Search'
import Articles from '@/components/userview/Articles'
import Tags from '@/components/userview/Tags'
import Preview from '@/components/Preview'
import store from '../store'
import axios from 'axios'
Vue.use(Router)

const router =  new Router({
  //修改默认路由格式
  mode: 'history',
  routes: [
    {
      path: '/sysadmin',
      component: Sidebar,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'comment',
          name: 'comment',
          component: Comments,
          meta: {
            keepAlive: true, // 需要被缓存
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'editor',
          name: 'editor',
          component: Editor,
          meta: {
            keepAlive: true, // 需要被缓存
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'person',
          name: 'person',
          component: Person,
          meta: {
            keepAlive: true, // 需要被缓存
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'publish',
          name: 'publish',
          component: Publish,
          meta: {
            keepAlive: true, // 需要被缓存
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'tag',
          name: 'tag',
          component: Tag,
          meta: {
            keepAlive: true, // 需要被缓存
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload,
          meta: {
            keepAlive: true, // 需要被缓存
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: 'editArticle',
          name: 'editArticle',
          component: EditArticle,
          meta: {
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: '/sysadmin/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sysadmin/password_find',
      name: 'findPassword',
      component: PasswordFind
    },
    {
      path: '/sysadmin/password_change',
      name: 'changePassword',
      component: PasswordChange
    },
    {
      path: '/sysadmin/detail_tag',
      name: 'detailTag',
      component: DetailTag,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sysadmin/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'articles',
          component: Articles
        },
        {
          path: '/archive',
          name: 'archive',
          component: Archive
        },
        {
          path: '/detail_article',
          name: 'detailArticle',
          component: DetailArticle
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }, 
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/tags',
          name: 'tags',
          component: Tags
        },
        {
          path: '/tag_articles',
          name: 'tagArticles',
          component: TagArticles
        },
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    store.commit('set_token', sessionStorage.getItem('token'))
  };
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      if (to.name == 'login') {
        next({
          path: '/sysadmin'
        })
      } else {
        next();
      }
    }
    else {
      if(to.name == 'login') {
        next()
      } else {
        next({
          path: '/sysadmin/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
  }
  else {
    next();
  }
});

export default router;