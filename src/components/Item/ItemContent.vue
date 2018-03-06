<template>
  <v-layout>
    <div>
      <!-- <tinymce id="d1" v-model="data" :other_options="editerOptions"></tinymce> -->
      <div>data:</div>
      <div>content:</div>
    </div>
  </v-layout>
</template>


<script>
  export default {
    props: ['content'],
    data () {
      return {
        data: this.content,
        editerOptions: {
          height: 300
        }
      }
    },
    created: function () {
      console.log('item content created')
    },
    destoryed: function () {
      console.log('item content destoryed')
    },
    updated: function () {
      console.log('item content updated')
    },
    mounted: function () {
      console.log('item content mounted')
    },
    watch: {
      '$route': function () {
        console.log('item content watch')
      }
    }
  }
</script>
