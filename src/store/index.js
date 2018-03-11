import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import itemflow from './itemflow'
import item from './item'
import flow from './flow'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    itemflow: itemflow,
    item: item,
    flow: flow,
    shared: shared
  }
})
