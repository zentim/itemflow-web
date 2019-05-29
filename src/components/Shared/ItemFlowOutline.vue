<template>
  <v-card color="white" flat>
    <v-textarea
      placeholder="Add title here..."
      full-width
      hide-details
      v-model="outlineTitle"
      class="itemflow-title py-0"
      rows="3"
    ></v-textarea>
    <v-textarea
      placeholder="Add message here..."
      full-width
      hide-details
      v-model="outlineMessage"
      :class="hiddenClass"
    ></v-textarea>

    <v-divider class="my-3" :class="hiddenClass"></v-divider>
    <h4 :class="hiddenClass">
      <v-icon color="primary">local_offer</v-icon>Labels:
    </h4>
    <app-labels
      :labels.sync="outlineLabels"
      :labelsFrom="outlineLabelsFrom"
      :key="id"
      :class="hiddenClass"
    ></app-labels>
    <v-btn class="hidden-md-and-up mb-3" color="info" block dark @click.stop="show = !show" large>
      <v-icon>{{show ? 'expand_less' : 'expand_more'}}</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default: () => []
    },
    labelsFrom: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      outlineTitle: '',
      outlineMessage: '',
      outlineLabels: [],
      outlineLabelsFrom: [],
      show: false
    }
  },
  mounted () {
    this.outlineTitle = this.title
    this.outlineMessage = this.message
    this.outlineLabels = this.labels
    this.outlineLabelsFrom = this.labelsFrom
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
    labelsFrom (newVal) {
      this.outlineLabelsFrom = newVal
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
<style scoped>
.itemflow-title {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
  line-height: normal;
}
.itemflow-message {
  font-size: 12px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  line-height: normal;
}
.input-group--text-field textarea {
  font-size: 12px !important;
}
.input-group--text-field textarea {
  font-size: 10px !important;
}
</style>
