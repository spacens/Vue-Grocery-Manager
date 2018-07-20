<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn color="primary" dark slot="activator" class="mb-2">Add Food</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add Food</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-select
                  label="Select a fridge"
                  :items="fridges"
                  item-text="label"
                  item-value="key"
                  v-model="fridge"
                  :rules="vRules"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Food"
                  v-model="food"
                  :rules="vRules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

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
  name: 'ComputedMsg',

  data  () {
    return {
      fridge: '',
      food: '',
      fridges,
      vRules: [v => !!v || 'Name is required'],
      dialog: false,
      valid: false
    }
  },

  methods: {
    ...mapActions([
      'addFood'
    ]),

    close () {
      this.dialog = false
      this.$refs.form.reset()
    },

    save () {
      if (this.$refs.form.validate()) {
        const { food, fridge } = this
        this.addFood({ food, fridge })
        this.close()
      }
    },

    open () {
      this.fridge = ''
      this.food = ''
    }
  }
}
</script>
