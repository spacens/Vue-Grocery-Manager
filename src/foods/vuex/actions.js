export const addFood = ({ commit }, food) => {
  commit('ADD_FOOD', { food })
}

export const deleteFood = ({ commit }, food) => {
  commit('DELETE_FOOD', { food })
}

export const loadFoods = ({ commit }) => {
  const str = localStorage.getItem('foods') || '[]'
  console.log(str)
  commit('LOAD_FOODS', JSON.parse(str))
}

export const setFilter = ({ commit }, filter) => {
  commit('SET_FILTER', { filter })
}
