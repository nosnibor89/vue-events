<template>
    <div>
        <h1>Events for {{ user.user.name }}</h1>
        <div v-show="!event.isLoading">
            <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
        </div>
        <template v-if="page != 1 && !event.isLoading">
            <router-link :to="{ name: 'event.list', query: { page: page - 1}}" rel="prev">Prev Page</router-link>
        </template>

        <template v-if="!event.isLoading && eventsCount === event.perPage">
            |
            <router-link :disabled="event.isLoading" :to="{ name: 'event.list', query: { page: page + 1}}" rel="next">
                Next Page
            </router-link>
        </template>


    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EventCard from '@/components/EventCard.vue'
import store from '@/store/store'

const getEventsForPage = async (to, from, next) => {
  const currentPage = Number.parseInt(to.query.page || 1)
  await store.dispatch('event/getEvents', {
    page: currentPage
  })
  to.params.page = currentPage
  next()
}

export default {
  props: {
    page: {
      required: true,
      type: Number
    }
  },
  components: {
    EventCard
  },
  computed: {
    ...mapState(['event', 'user']),
    ...mapGetters('event', ['eventsCount'])
  },
  beforeRouteEnter: getEventsForPage,
  beforeRouteUpdate: getEventsForPage
}
</script>
