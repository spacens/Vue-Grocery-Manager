<template>
  <div>
    <v-layout wrap>
      <v-flex xs6 sm8>
        <AddFood />
        <MoveFood />
      </v-flex>
      <v-flex xs6 sm4>
        <v-select
          label="Fridge"
          :items="fridgeFilter"
          item-text="label"
          item-value="key"
          v-model="selected"
          @change="changeFilter"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-data-table
      :headers="headers"
      :items="foods"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.index + 1 }}</td>
        <td>{{ props.item.fridge | fridgeLabel }}</td>
        <td>{{ props.item.food }}</td>
        <td>{{ props.item.count }}</td>
        <td>
          <v-btn flat icon color="primary" @click="removeItem(props.item)">
            <v-icon>check</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="info" icon="warning">
          Hungry? You don't have any food in the fridges! Please buy them!
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { find } from 'lodash'
import AddFood from './AddFood.vue'
import MoveFood from './MoveFood.vue'
import constants from '../constants'

export default {
  name: 'FoodList',

  components: {
    AddFood,
    MoveFood
  },

  computed: {
    ...mapGetters({
      foods: 'getFoodList',
      fridge1Foods: 'getFoodList1',
      fridge2Foods: 'getFoodList2'
    })
  },

  data  () {
    return {
      headers: [
        {
          text: 'No',
          sortable: false,
          value: 'no'
        },
        { text: 'Fridge', value: 'fridge' },
        { text: 'Name', value: 'food' },
        { text: 'Count', value: 'count' },
        {
          text: 'Use Food',
          sortable: false,
          value: 'actions'
        }
      ],
      fridgeFilter: [
        constants.defaultFilter,
        ...constants.fridges
      ],
      selected: constants.defaultFilter
    }
  },

  filters: {
    fridgeLabel (key) {
      const item = find(constants.fridges, { key })
      return item ? item.label : ''
    }
  },

  methods: {
    ...mapActions([
      'deleteFood',
      'loadFoods',
      'setFilter'
    ]),

    removeItem (item) {
      this.deleteFood(item)
    },

    changeFilter (item) {
      this.setFilter(item)
    }
  },

  mounted () {
    this.loadFoods()
  }
}
</script>
