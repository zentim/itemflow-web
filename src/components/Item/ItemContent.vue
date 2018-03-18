<template>
  <v-card flat>
    <tinymce
      id="d1"
      v-model="data"
      v-on:editorInit="initCallBack"
      ref="tm"
      :htmlClass="editerHtmlClass"
      :plugins="editerPlugins"
      :toolbar1="editerToolbar1"
      :other_options="editerOptions"></tinymce>
  </v-card>
</template>


<script>
  export default {
    props: ['content'],
    data () {
      return {
        data: this.content,
        editerHtmlClass: '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        editerPlugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualchars code fullscreen',
          'insertdatetime media nonbreaking save table',
          'template paste textcolor colorpicker textpattern imagetools toc emoticons hr codesample'
        ],
        editerToolbar1: 'undo redo | backcolor bold italic underline | table codesample | bullist numlist outdent indent | hr removeformat  | fontsizeselect',
        editerOptions: {
          height: 450,
          menubar: false,
          content_style: ".mce-content-body {font-size:10pt;font-family:sans-serif;}"
        }
      }
    },
    // computed: {
    //   editerOptions () {
    //     if (this.$route.name === 'CreateItem') {
    //       return {
    //         height: 350,
    //         auto_focus: 'd1'
    //       }
    //     } else {
    //       return {
    //         height: 350
    //       }
    //     }
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
