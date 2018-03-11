<template>
  <v-card>
    <tinymce
      id="d1"
      v-model="data"
      v-on:editorInit="initCallBack"
      ref="tm"
      :other_options="editerOptions"></tinymce>
  </v-card>
</template>


<script>
  export default {
    props: ['content'],
    data () {
      return {
        data: this.content
      }
    },
    computed: {
      editerOptions () {
        if (this.$route.name === 'CreateItem') {
          return {
            height: 350,
            auto_focus: 'd1'
          }
        } else {
          return {
            height: 350
          }
        }
      }
    },
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
