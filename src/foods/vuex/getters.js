export default {
  getFoodList: state => {
    return state.list.filter(
      item => !state.filter || item.fridge === state.filter
    )
  }
}
