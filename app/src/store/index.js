import { createStore } from 'vuex'
import { alert } from './alert.module.js'
import { account } from './account.module.js'

export default createStore({
  modules: {
    alert,
    account
  }
})
