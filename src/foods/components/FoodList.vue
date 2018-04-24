<template>
  <div>
    <h1>Food List Component</h1>

    <div>
      <input v-model="foodName">
      <button @click="onAddFood">Add</button>
    </div>

    <ul>
      <li
        v-for="(val, key) in foods"
        :key="key"
        @click="deleteFood(key)"
      >
        {{ val.food }} - {{ val.count }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FoodList',

  data: () => {
    return {
      foodName: ''
    }
  },

  methods: {
    ...mapActions([
      'addFood',
      'deleteFood'
    ]),

    onAddFood () {
      this.addFood(this.foodName)
    }
  },

  computed: {
    ...mapState({
      'foods': state => {
        console.log(state)
        return state.foods.list
      }
    })
  }
}
</script>
