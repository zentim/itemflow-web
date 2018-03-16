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
// import fuzzysort from 'fuzzysort'
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
      // console.log('start search')
      // let result = fuzzysort.go(newVal, this.itemflow, {key: 'title'})
      // console.log(result)
      // for(let i = 0; i < result.length; i++) {
      //   console.log(result[i].obj.id + ': ' + result[i].obj.title)
      // }
    }
  }
  // mounted () {
  //   console.log('start search')
  //   // Example: console.log(fuzzysort.go('t', ['test', 'apple', 'taaat']))
  //   // console.log(fuzzysort.go('t', ['test', 'apple', 'taaat']))
  //   // console.log(fuzzysort.go('mr', [{file:'Monitor.cpp'}, {file:'MeshRenderer.cpp'}], {key: 'file'}))
  //   let testdata = this.$store.
  //   console.log(fuzzysort.go('Id', testdata, {key: 'title'}))
  // }
}
</script>
