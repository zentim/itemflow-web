<template>
  <v-toolbar color="white" height="40px" tail flat>
    <v-spacer></v-spacer>
    <v-menu left>
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile class="orange--text" @click="favorite">
          <v-list-tile-title>
            <v-icon class="orange--text">star</v-icon>
            Favorite
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="red--text" @click="remove">
          <v-list-tile-title>
            <v-icon class="red--text">delete</v-icon>
            Delete
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  props: ['id', 'type', 'isDeleted'],
  data () {
    return {
    }
  },
  methods: {
    favorite () {
      console.log('add to favorite')
    },
    remove () {
      this.$emit('update:isDeleted', true)
      this.$store.dispatch('removeItemFlow', {
        id: this.id,
        type: this.type
      })
      this.$router.push('/')
    }
  }
}
</script>
