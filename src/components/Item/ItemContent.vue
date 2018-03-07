<template>
  <v-layout>
    <v-card>
      <tinymce
        id="d1"
        v-model="data"
        v-on:editorInit="initCallBack"
        ref="tm"
        :other_options="editerOptions"></tinymce>
    </v-card>
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
    // created: function () {
    //   console.log('item content created')
    // },
    // destoryed: function () {
    //   console.log('item content destoryed')
    // },
    // updated: function () {
    //   console.log('item content updated')
    // },
    // mounted: function () {
    //   console.log('item content mounted')
    // },
    // watch: {
    //   '$route': function () {
    //     console.log('item content watch')
    //   }
    // },
    methods: {
      initCallBack (e) {
        // console.log(this.$refs.tm.editor)
        // console.log('init', e)
        e.setContent(this.data)
        // this.$refs.tm.editor.setContent(this.itemContent)
      }
    },
    watch: {
      content (newVal) {
        this.data = newVal
      },
      data (newVal) {
        this.$emit('update:content', newVal)
      }
    }
  }
</script>
