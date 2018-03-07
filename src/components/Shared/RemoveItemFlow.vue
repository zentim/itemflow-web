<template>
  <v-btn @click="remove">
    <v-icon>delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['id', 'type'],
  methods: {
    remove () {
      this.$store.dispatch('removeItemFlow', {
        id: this.id,
        type: this.type
      })
      this.$router.push('/' + this.type + 's')
    }
  }
}
</script>
