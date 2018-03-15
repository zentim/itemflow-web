<template>
  <v-toolbar color="white" height="40px" tail flat>
    <v-btn
      icon
      :class="fav ? 'yellow--text' : ''"
      @click="fav = !fav">
      <v-icon>star</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-menu left>
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="remove" class="red--text">
          <v-list-tile-title>
            <v-icon>delete</v-icon>
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
      fav: false
    }
  },
  methods: {
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
