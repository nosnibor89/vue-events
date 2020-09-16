<template>
    <div>
        <h1>Create Event, {{ username }} </h1>
        <form @submit.prevent="createEvent">
            <label>Select a category</label>
            <select v-model="event.category">
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
            </select>
            <h3>Name & describe your event</h3>
            <BaseInput label="Title" placeholder="Add an event title" type="text" v-model="event.title"/>
            <BaseInput label="Description" v-model="event.description" type="text" placeholder="Add a description"/>
            <h3>Where is your event?</h3>
            <BaseInput label="Location" v-model="event.location" type="text" placeholder="Add a location"/>
            <h3>When is your event?</h3>
            <div class="field">
                <label>Date</label>
                <datepicker v-model="event.date" placeholder="Select a date"/>
            </div>
            <div class="field">
                <label>Select a time</label>
                <select v-model="event.time">
                    <option v-for="time in times" :key="time">{{ time }}</option>
                </select>
            </div>
            <input type="submit" class="button -fill-gradient" value="Submit"/>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapGetters } from 'vuex'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      event: this.createFreshEventObject(),
      times
    }
  },
  computed: {
    ...mapGetters(['event/getEventById']),
    ...mapState(['categories']),
    username() {
      return this.$store.state.user.user.name
    }
  },
  methods: {
    async createEvent() {
      NProgress.start()
      await this.$store.dispatch('event/creatEvent', this.event)
      this.$router.push({
        name: 'event.show',
        params: { id: this.event.id }
      })
      this.event = this.createFreshEventObject()
    },
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 1000000)

      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
