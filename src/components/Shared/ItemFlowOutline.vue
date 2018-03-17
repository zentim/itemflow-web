<template>
  <v-card color="white" flat>
      <v-text-field
        placeholder="Add title here..."
        v-model="outlineTitle"
        counter
        max="120"
        rows="3"
        full-width
        multi-line
        hide-details
        class="title py-0"
      ></v-text-field>
      <v-text-field
        placeholder="Add message here..."
        v-model="outlineMessage"
        counter
        max="120"
        rows="8"
        full-width
        multi-line
        hide-details
        :class="hiddenClass"
      ></v-text-field>
      <v-divider class="my-3" :class="hiddenClass"></v-divider>
      <h4 :class="hiddenClass"><v-icon color="primary">local_offer</v-icon> Labels:</h4>
      <app-labels :labels.sync="outlineLabels" :key="id" :class="hiddenClass"></app-labels>
      <v-btn class="hidden-md-and-up mb-3" color="info" block dark @click.stop="show = !show" large><v-icon>{{show ? 'expand_less' : 'expand_more'}}</v-icon></v-btn>
  </v-card>
</template>

<script>
export default {
  props: ['id', 'title', 'message', 'labels'],
  data () {
    return {
      outlineTitle: '',
      outlineMessage: '',
      outlineLabels: [],
      show: false
    }
  },
  mounted () {
    this.outlineTitle = this.title
    this.outlineMessage = this.message
    this.outlineLabels = this.labels
  },
  computed: {
    hiddenClass () {
      return this.show ? '' : 'hidden-sm-and-down'
    }
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
