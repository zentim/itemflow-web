<template>
  <v-btn @click="remove">
    <v-icon>delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['id', 'type', 'isDeleted'],
  methods: {
    remove () {
      this.$emit('update:isDeleted', true)
      console.log(this.type)
      this.$store.dispatch('removeItemFlow', {
        id: this.id,
        type: this.type
      })
      this.$router.push('/')
    }
  }
}
</script>
