<template>
  <div>
    <tinymce
      id="d1"
      v-model="data"
      v-on:editorInit="initCallBack"
      ref="tm"
      :htmlClass="editerHtmlClass"
      :plugins="editerPlugins"
      :toolbar1="editerToolbar1"
      :other_options="editerOptions"
    ></tinymce>
  </div>
</template>


<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data: this.content,
      editerHtmlClass: '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      editerPlugins: [
        'autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualchars code fullscreen',
        'insertdatetime media nonbreaking save table',
        'template paste textcolor colorpicker textpattern imagetools toc emoticons hr codesample'
      ],
      editerToolbar1: 'undo redo bold mark hr bullist numlist table codesample removeformat ',
      editerOptions: {
        height: this.getWindowHeight(),
        menubar: false,
        paste_data_images: true,
        codesample_content_css: 'static/plugins/codesample/css/prism.css',
        content_style: '.mce-content-body {font-size:10pt;font-family:sans-serif;} .mce-content-body img {max-width:100%;height:auto;} p{-webkit-margin-before: 0px;-webkit-margin-after: 0px;}',
        setup: function (editor) {
          editor.addButton('mark', {
            text: 'H',
            icon: false,
            onclick: function () {
              let toggleFormat = function (name, value) {
                editor.formatter.toggle(name, value ? { value: value } : undefined)
                editor.nodeChanged()
              }
              toggleFormat('hilitecolor', 'yellow')
              window.console.log(editor)
            }
          })

          editor.shortcuts.add('ctrl+h', 'To highlight', function () {
            let toggleFormat = function (name, value) {
              editor.formatter.toggle(name, value ? { value: value } : undefined)
              editor.nodeChanged()
            }
            toggleFormat('hilitecolor', 'yellow')
            window.console.log(editor)
          })
        }
      }
    }
  },
  methods: {
    initCallBack (e) {
      // window.console.log(this.$refs.tm.editor)
      // window.console.log('init', e)
      e.setContent(this.data)
      // this.$refs.tm.editor.setContent(this.itemContent)
    },
    getWindowHeight () {
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

      return height * 0.84
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
