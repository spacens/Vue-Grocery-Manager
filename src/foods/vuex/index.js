import * as actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  list: [],
  filter: ''
}

export default {
  state,
  actions,
  getters,
  mutations
}
