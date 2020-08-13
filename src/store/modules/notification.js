export const namespaced = true

const PUSH = 'PUSH'
const DELETE = 'DELETE'

export const state = {
  notifications: []
}

let nextId = 1
export const mutations = {
  [PUSH]: (state, notification) => {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  [DELETE]: (state, notificationToRemove) => {
    state.notifications = state.notifications.filter(
      n => n.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    commit(PUSH, notification)
  },
  remove({ commit }, notification) {
    commit(DELETE, notification)
  }
}
