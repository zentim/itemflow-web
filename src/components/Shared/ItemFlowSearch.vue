<template>
  <v-text-field
    prepend-icon="search"
    label="Search..."
    solo-inverted
    v-model="searchInput"
    append-icon="close"
    :append-icon-cb="clearSearchInput"
  ></v-text-field>
</template>

<script>
export default {
  data () {
    return {
      searchInput: ''
    }
  },
  computed: {
    itemflow () {
      return this.$store.getters.loadedItemFlow
    }
  },
  methods: {
    clearSearchInput () {
      this.searchInput = ''
    }
  },
  watch: {
    searchInput (newVal) {
      this.$store.dispatch('searchItemFlow', newVal)
    }
  }
}
</script>
