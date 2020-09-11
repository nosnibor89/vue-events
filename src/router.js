import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event.list',
      component: EventList,
      props: true
    },
    {
      path: '/event/:id',
      name: 'event.show',
      component: EventShow,
      props: true,
      beforeEnter: async (routeTo, routeFrom, next) => {
        const event = await store.dispatch('event/getEvent', {
          id: routeTo.params.id
        })
        console.log(event)
        routeTo.params.event = event
        next()
      }
    },
    {
      path: '/event/create',
      name: 'event.create',
      component: EventCreate
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
