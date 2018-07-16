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
import store from '../store'
import axios from 'axios'
Vue.use(Router)

// sessionStorage.setItem('token', '123');

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
};

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
    } 
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      console.log(store.state.token)
      axios.post("http://127.0.0.1:5000/sysadmin/validate_token")
      .then(function(response) {
        console.log(response.data.code)
        if (response.data.code == 200) {
          if (to.name == 'login') {
            next({
              path: '/sysadmin'
            })
          } else {
            next()
          }
        } else {
          next({
            path: '/sysadmin/login'
          })
        }
      }).catch(function(error) {
        console.log(error)
      })
      // if (result.code == 200) {
      //   next()
      // } else {
      //   next({
      //     path: '/sysadmin/login',
      //     query: {
      //       redirect: to.fullPath
      //     }
      //   })
      // }
      next();
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