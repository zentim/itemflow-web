<template>
  <v-toolbar color="white" height="40px" tail flat>
    <v-spacer></v-spacer>
    <v-menu left>
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile :class="switchTypeBtnColor" @click="switchType">
          <v-list-tile-title>
            <v-icon :class="switchTypeBtnColor">swap_horiz</v-icon>
            {{ type === 'item' ? 'become Flow' : 'become Item'}}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="orange--text" @click="favorite">
          <v-list-tile-title>
            <v-icon class="orange--text">star</v-icon>
            {{ isFavorite ? 'undo favorite' : 'Favorite'}}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="moveToTrash">
          <v-list-tile-title>
            <v-icon v-if="!deletedDate">delete</v-icon>
            <v-icon v-if="!!deletedDate">restore_from_trash</v-icon>
            {{ deletedDate ? 'restore from trash' : 'move to trash' }}
          </v-list-tile-title>
        </v-list-tile>
        <!-- <v-list-tile class="red--text" @click="removeForever">
          <v-list-tile-title>
            <v-icon class="red--text">delete_forever</v-icon>
            delete forever
          </v-list-tile-title>
        </v-list-tile> -->
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  props: ['id', 'type', 'isFavorite', 'isDeleted', 'deletedDate'],
  computed: {
    switchTypeBtnColor () {
      return this.type === 'item' ? 'blue--text' : 'green--text'
    }
  },
  methods: {
    switchType () {
      let type = this.type === 'item' ? 'flow' : 'item'
      this.$emit('update:type', type)
    },
    favorite () {
      this.$emit('update:isFavorite', !this.isFavorite)
    },
    moveToTrash () {
      if (this.deletedDate) {
        this.$emit('update:deletedDate', false)
      } else {
        this.$emit('update:deletedDate', new Date().toISOString())
      }
      this.$router.push('/')
    }
    // removeForever () {
    //   this.$emit('update:isDeleted', true)
    //   this.$store.dispatch('removeItemFlow', {
    //     id: this.id,
    //     type: this.type
    //   })
    //   this.$router.push('/')
    // }
  }
}
</script>
