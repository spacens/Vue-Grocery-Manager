import { values } from 'lodash'

export default {
  getFoodList: (state, getters) => () => {
    return values(state.foods)
  }
}
