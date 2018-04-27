<template>
  <div>
    <v-layout wrap>
      <v-flex xs6 sm8>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn color="primary" dark slot="activator" class="mb-2">Add Food</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Add Food</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-select
                      label="Select a fridge"
                      :items="fridges"
                      item-text="label"
                      item-value="key"
                      v-model="editItem.fridge"
                      :rules="vRules"
                      single-line
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="Food"
                      v-model="editItem.food"
                      :rules="vRules"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-flex>
        <v-flex xs6 sm4>
          <v-select
            label="Fridge"
            :items="fridgeFilter"
            item-text="label"
            item-value="key"
            v-model="selected"
            @change="changeFilter"
            single-line
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

const fridges = [
  {
    label: 'Fridge 1',
    key: 'fridge-1'
  },
  {
    label: 'Fridge 2',
    key: 'fridge-2'
  }
]

export default {
  name: 'FoodList',

  computed: {
    ...mapGetters({
      foods: 'getFoodList'
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
      defaultItem: {
        food: '',
        fridge: 0,
        count: 0
      },
      dialog: false,
      editItem: {},
      editIndex: -1,
      fridges,
      fridgeFilter: [
        {
          label: 'All',
          key: ''
        },
        ...fridges
      ],
      selected: {
        label: 'All',
        key: ''
      },
      vRules: [v => !!v || 'Name is required']
    }
  },

  filters: {
    fridgeLabel (key) {
      const item = find(fridges, { key })
      return item ? item.label : ''
    }
  },

  methods: {
    ...mapActions(['addFood', 'deleteFood', 'loadFoods', 'setFilter']),

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      this.addFood(this.editItem)
      this.close()
    },

    removeItem (item) {
      this.deleteFood(item)
    },

    changeFilter (item) {
      console.log(item)
      this.setFilter(item)
    }
  },

  mounted () {
    this.loadFoods()
  }
}
</script>
