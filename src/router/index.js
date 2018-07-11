import Vue from 'vue'
import Router from 'vue-router'
import Comments from '@/components/Comment'
import Editor from '@/components/Editor'
import Person from '@/components/Person'
import Publish from '@/components/Publish'
import Sidebar from '@/components/Sidebar'
import Tag from '@/components/Tag'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/comment',
      name: 'comment',
      component: Comments
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/person',
      name: 'person',
      component: Person
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: Sidebar
    },
    {
      path: '/tag',
      name: 'tag',
      component: Tag
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    }
  ]
})
