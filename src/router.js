import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue'
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
        try {
          const event = await store.dispatch('event/getEvent', {
            id: routeTo.params.id
          })
          // console.log(event)
          routeTo.params.event = event
          next()
        } catch (error) {
          const errorName =
            error.response && error.response.status === 404
              ? '404'
              : 'network-issue'
          next({ name: errorName, params: { resource: 'event' } })
        }
      }
    },
    {
      path: '/event/create',
      name: 'event.create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
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
