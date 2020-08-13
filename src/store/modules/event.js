import EventService from '@/services/EventService'

const ADD_EVENT = 'ADD_EVENT'
const SET_EVENTS = 'SET_EVENTS'
const SET_EVENT = 'SET_EVENT'

export const namespaced = true
export const state = {
  events: [],
  event: {}
}
export const mutations = {
  [ADD_EVENT]: (state, event) => state.events.push(event),
  [SET_EVENTS]: (state, events) => (state.events = events),
  [SET_EVENT]: (state, event) => (state.event = event)
}
export const actions = {
  async creatEvent({ commit, dispatch }, event) {
    let notification = {}
    try {
      await EventService.postEvent(event)
      commit(ADD_EVENT, event)
      notification = {
        type: 'success',
        message: 'Event created successfully'
      }
    } catch (error) {
      console.log(error)
      notification = {
        type: 'error',
        message: 'There was a problem saving the event:' + error.message
      }
    }
    dispatch('notification/add', notification, { root: true })
  },
  async getEvents({ commit, dispatch }, { perPage, page }) {
    try {
      const { data } = await EventService.getEvents(perPage, page)
      commit(SET_EVENTS, data)
    } catch (error) {
      console.log(error)
      const notification = {
        type: 'error',
        message: 'There was a problem fetching the events:' + error.message
      }

      dispatch('notification/add', notification, { root: true })
    }
  },
  async getEvent({ commit, getters, dispatch }, { id }) {
    let event = getters.getEventById(id)

    if (!event) {
      try {
        const { data } = await EventService.getEvent(id)
        event = data
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching the event:' + error.message
        }

        dispatch('notification/add', notification, { root: true })
        console.log('There was an error:', error.response)
      }
    }
    commit(SET_EVENT, event)
  }
}
export const getters = {
  getEventById(state) {
    return id => state.events.find(e => e.id === id)
  }
}
