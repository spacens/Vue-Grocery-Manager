<template>
  <v-form v-model="valid">
    <h2>Add a food</h2>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field
            label="Food"
            v-model="foodName"
            :rules="vRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-select
            label="Select a fridge"
            :items="fridges"
            item-text="label"
            v-model="selectedFridge"
            :rules="vRules"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs4>
          <v-btn
            color="success"
            @click="onAddFood"
            :disabled="!valid"
          >Add</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddFood',

  data () {
    return {
      foodName: '',
      fridges: [
        {
          label: 'Fridge 1',
          key: 'fridge-1'
        },
        {
          label: 'Fridge 2',
          key: 'fridge-2'
        }
      ],
      selectedFridge: '',
      valid: false,
      vRules: [
        v => !!v || 'Name is required'
      ]
    }
  },

  methods: {
    ...mapActions([
      'addFood',
      'deleteFood'
    ]),

    onAddFood () {
      console.log(this.foodName, this.selectedFridge)
      this.addFood({
        food: this.foodName,
        fridge: this.selectedFridge.key
      })
    }
  }
}
</script>

<style>
.form {
  min-width: 300px;
}
.btn {
  margin: 12px 8px 0
}
</style>
