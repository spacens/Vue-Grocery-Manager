export const addFood = ({ commit }, food) => {
  commit('ADD_FOOD', { food })
}

export const deleteFood = ({ commit }, key) => {
  commit('DELETE_FOOD', { key })
}
