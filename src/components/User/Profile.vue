<template>
  <v-layout>
    <v-flex>
      <div>
        {{ user.id }}
        {{ user.email }}
      </div>
      <v-btn @click="onLogout" class="primary">Logout</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
