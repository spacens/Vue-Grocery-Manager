export default {
  getFoodList: state => {
    return state.list.filter(
      item => !state.filter || item.fridge === state.filter
    )
  },

  getFoodList1: state => {
    return state.list.filter(
      item => item.fridge === 'fridge-1'
    )
  },

  getFoodList2: state => {
    return state.list.filter(
      item => item.fridge === 'fridge-2'
    )
  }
}
