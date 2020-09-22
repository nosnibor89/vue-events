<template>
  <div>
    <h1>Create Event, {{ username }} </h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
          :options="categories"
          label="Select a category"
          v-model="$v.event.category.$model"
          :selectClass="$v.event.category.$error ? 'error' : ''"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required</p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput label="Title"
                 placeholder="Add an event title"
                 type="text"
                 v-model.trim="$v.event.title.$model"
                 :inputClass="$v.event.title.$error ? 'error' : ''"/>
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required</p>
      </template>
      <BaseInput label="Description" v-model="event.description" type="text" placeholder="Add a description"/>
      <h3>Where is your event?</h3>
      <BaseInput label="Location"
                 v-model="$v.event.location.$model"
                 type="text"
                 placeholder="Add a location"
                 :inputClass="$v.event.location.$error ? 'error' : ''"/>
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required</p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="$v.event.date.$model"
                    placeholder="Select a date"
                    :input-class="{ error: $v.event.location.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Date is required</p>
      </template>
      <BaseSelect
          :options="times"
          label="Select a time"
          v-model="$v.event.time.$model"
          :selectClass="$v.event.time.$error ? 'error' : ''"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required</p>
      </template>
      <BaseButton type="submit"
                  :disabled="$v.$anyError"
                  class="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

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
    ...mapState(['categories']),
    username() {
      return this.$store.state.user.user.name
    }
  },
  methods: {
    async createEvent() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

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
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
