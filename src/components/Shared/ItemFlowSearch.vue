<template>
  <v-text-field
    prepend-inner-icon="search"
    label="Search..."
    solo-inverted
    flat
    v-model="searchInput"
    append-icon="close"
    @click:append="clearSearchInput"
    @keyup.enter.native="searchItemflow"
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
    searchKeyword () {
      return this.$store.getters.searchKeyword
    }
  },
  methods: {
    clearSearchInput () {
      this.searchInput = ''
    },
    searchItemflow () {
      this.$store.commit('setSearchKeyword', this.searchInput)
      this.$store.dispatch('searchItemFlow')
    }
  },
  watch: {
    searchInput (newVal) {
      if (newVal === '') {
        this.searchItemflow()
      }
    },
    searchKeyword (newVal) {
      this.searchInput = newVal
    }
  }
}
</script>
