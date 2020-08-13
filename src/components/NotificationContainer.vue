<template>
    <div class="notification-container">
        <NotificationBar v-for="noti in notifications" :notification="noti" :key="noti.id" />
    </div>
</template>

<script>
import NotificationBar from './NotficationBar'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationBar
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: mapState({
    notifications: state => state.notification.notifications
  })
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
