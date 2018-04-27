export const save = foods => {
  localStorage.setItem('foods', JSON.stringify(foods))
}
