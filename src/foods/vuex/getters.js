import { values } from 'lodash'

export default {
  getFoodList: state => values(state.list)
}
