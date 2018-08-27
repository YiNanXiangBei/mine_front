import Vue from 'vue'
import VueRouter from 'vue-router'
const Comments = () => import('@/components/Comment')
const Editor = () => import('@/components/Editor')
const Person = () => import('@/components/Person')
const Publish = () => import('@/components/Publish')
const Sidebar = () => import('@/components/Sidebar')
const Tag = () => import('@/components/Tag')
const Upload = () => import('@/components/Upload')
const Login = () => import('@/components/Login')
const EditArticle = () => import('@/components/EditArticle')
const PasswordFind = () => import('@/components/PasswordFind')
const PasswordChange = () => import('@/components/PasswordChange')
const DetailTag = () => import('@/components/DetailTag')
const TagArticles = () => import('@/components/userview/TagArticles')
const Home = () => import('@/components/userview/Home')
const About = () => import('@/components/userview/About')
const Archive = () => import('@/components/userview/Archive')
const DetailArticle = () => import('@/components/userview/DetailArticle')
const Search = () => import('@/components/userview/Search')
const Articles = () => import('@/components/userview/Articles')
const Tags = () => import('@/components/userview/Tags')
const Preview = () => import('@/components/Preview')

import store from '../store'
import axios from 'axios'

const router =  new VueRouter({
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