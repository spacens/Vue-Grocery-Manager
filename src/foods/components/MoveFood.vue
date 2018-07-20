<template>
  <v-dialog v-model="dialog1" max-width="500px">
    <v-btn color="primary" dark slot="activator" class="mb-2" @click="openMovement">Move Food</v-btn>
    <v-card>
      <v-card-title>
        <span>Move groceries between Fridge 1 and Fridge 2</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs5>
              <v-list subheader class="list">
                <v-subheader class="text-center">Fridge1</v-subheader>
                <v-list-tile
                  v-for="(item, index) in flist1"
                  :key="'f1-' + index"
                  @click="selectListItem1(index)"
                  :class="{ active: index === selected1 }"
                >
                  <v-list-tile-content class="fl-item">
                    {{ item.food }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
            <v-flex xs2 align-content-center>
              <div>
                <v-btn outline fab color="info" @click="moveToLeft">&lt;&lt;</v-btn>
                <v-btn outline fab color="info" @click="moveToRight">&gt;&gt;</v-btn>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-list subheader class="list">
                <v-subheader>Fridge 2</v-subheader>
                <v-list-tile
                  v-for="(item, index) in flist2"
                  :key="'f2-' + index"
                  @click="selectListItem2(index)"
                  :class="{ active: index === selected2 }"
                >
                  <v-list-tile-content class="fl-item">
                    {{ item.food }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="saveMovement">Apply</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="closeMovement">Cancel</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { findIndex } from 'lodash'

export default {
  name: 'MoveFood',

  computed: {
    ...mapGetters({
      fridge1Foods: 'getFoodList1',
      fridge2Foods: 'getFoodList2'
    })
  },

  data  () {
    return {
      dialog1: false,
      flist1: [],
      flist2: [],
      selected1: -1,
      selected2: -2
    }
  },

  methods: {
    ...mapActions([ 'moveItems' ]),

    closeMovement () {
      this.dialog1 = false
    },

    saveMovement () {
      this.moveItems({
        fridge1: this.flist1,
        fridge2: this.flist2
      })

      this.closeMovement()
    },

    openMovement () {
      this.selected1 = -1
      this.selected2 = -1
      this.flist1 = this.fridge1Foods.slice(0)
      this.flist2 = this.fridge2Foods.slice(0)
    },

    selectListItem1 (i) {
      this.selected1 = i
      this.selected2 = -1
    },

    selectListItem2 (i) {
      this.selected2 = i
      this.selected1 = -1
    },

    moveToLeft () {
      if (this.selected2 < 0) {
        return
      }

      const item = this.flist2.splice(this.selected2, 1)
      const index = findIndex(this.flist1, {
        food: item[0].food
      })

      if (index < 0) {
        this.flist1.push(...item)
        this.selected1 = this.flist1.length - 1
      } else {
        this.flist1[index] = {
          food: item[0].food,
          fridge: 'fridge-1',
          count: this.flist1[index].count + item[0].count
        }
        this.selected1 = index
      }
      this.selected2 = -1
    },

    moveToRight () {
      if (this.selected1 < 0) {
        return
      }

      const item = this.flist1.splice(this.selected1, 1)
      const index = findIndex(this.flist2, {
        food: item[0].food
      })

      if (index < 0) {
        this.flist2.push(...item)
        this.selected2 = this.flist2.length - 1
      } else {
        this.flist2[index] = {
          food: item[0].food,
          fridge: 'fridge-2',
          count: this.flist2[index].count + item[0].count
        }
        this.selected2 = index
      }
      this.selected1 = -1
    }
  }
}
</script>

<style scoped>
.active {
  background: #babae8 !important;
}
</style>
