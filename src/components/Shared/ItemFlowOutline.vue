<template>
  <v-card>
      <v-divider></v-divider>
      <v-text-field
        placeholder="Add title here..."
        v-model="outlineTitle"
        counter
        max="120"
        rows="3"
        full-width
        multi-line
        hide-details
        class="title"
      ></v-text-field>
      <v-divider></v-divider>
      <v-text-field
        placeholder="Add message here..."
        v-model="outlineMessage"
        counter
        max="120"
        rows="7"
        full-width
        multi-line
        hide-details
      ></v-text-field>
      <v-divider class="my-3"></v-divider>
      <h4>Labels:</h4>
      <app-labels :labels.sync="outlineLabels" :key="id"></app-labels>
  </v-card>
</template>

<script>
export default {
  props: ['id', 'title', 'message', 'labels'],
  data () {
    return {
      outlineTitle: '',
      outlineMessage: '',
      outlineLabels: []
    }
  },
  mounted () {
    this.outlineTitle = this.title
    this.outlineMessage = this.message
    this.outlineLabels = this.labels
  },
  watch: {
    title (newVal) {
      this.outlineTitle = newVal
    },
    message (newVal) {
      this.outlineMessage = newVal
    },
    labels (newVal) {
      this.outlineLabels = newVal
    },
    outlineTitle (newVal) {
      if (this.title !== newVal) {
        this.$emit('update:title', newVal)
      }
    },
    outlineMessage (newVal) {
      if (this.message !== newVal) {
        this.$emit('update:message', newVal)
      }
    },
    outlineLabels (newVal) {
      if (this.labels !== newVal) {
        this.$emit('update:labels', newVal)
      }
    }
  }
}
</script>
