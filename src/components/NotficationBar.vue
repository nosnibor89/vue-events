<template>
    <p class="notification-bar" :class="notificationTypeClass">
        {{ notification.message }}
    </p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 2000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
