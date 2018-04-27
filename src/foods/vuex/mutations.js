import Vue from 'vue'
import { findIndex } from 'lodash'
import { save } from '../utils'

export default {
  LOAD_FOODS (state, payload) {
    state.list = payload
    state.list.forEach((o) => {
      o.count = parseInt(o.count)
    })
  },

  ADD_FOOD (state, { food }) {
    let index = findIndex(state.list, food)

    console.log(index, food)

    if (index < 0) {
      state.list.push({...food, count: 1})
    } else {
      state.list[index].count++
    }

    save(state.list)
  },

  DELETE_FOOD (state, { food }) {
    let index = findIndex(state.list, food)

    if (state.list[index].count > 1) {
      state.list[index].count--
    } else {
      Vue.delete(state.list, index)
    }

    save(state.list)
  },

  SET_FILTER (state, { filter }) {
    state.filter = filter
  }
}
