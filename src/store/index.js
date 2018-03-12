import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import itemflow from './itemflow'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    itemflow: itemflow,
    shared: shared
  }
})
