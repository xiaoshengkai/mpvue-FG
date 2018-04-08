import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    latitude: 0,
    longitude: 0
  },
  mutations: {
    changeState (state, obj) {
      for (let key of Object.keys(obj)) {
        state[key] = obj[key]
      }
    }
  }
})

Vue.prototype.$store = store

export default store
