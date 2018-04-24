import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { findKey } from 'lodash'

export default {
  ADD_FOOD (state, { food }) {
    let key = findKey(state.list, { food })

    if (key) {
      state.list[key].count++
    } else {
      key = uuidv4()

      state.list = {
        ...state.list,
        [key]: {
          food,
          count: 1
        }
      }
    }
  },

  DELETE_FOOD (state, { key }) {
    if (state.list[key].count > 1) {
      state.list[key].count--
    } else {
      Vue.delete(state.list, key)
    }
  }
}
