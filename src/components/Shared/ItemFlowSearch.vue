<template>
  <v-text-field
    prepend-inner-icon="search"
    label="Search..."
    solo
    flat
    hide-details
    clearable
    v-model="searchInput"
    @keyup.enter.native="searchItemflow"
    style="border: 1px solid #e8e8e8"
  ></v-text-field>
</template>

<script>
export default {
  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    searchItemflow () {
      this.$store.commit('setSearchKeyword', this.searchInput)
      this.$store.dispatch('searchItemFlow')
    }
  },
  watch: {
    searchInput (newVal) {
      if (newVal === null) {
        this.searchItemflow()
      }
    }
  }
}
</script>
