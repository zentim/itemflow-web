<template>
  <router-link
    :to="'/' + type + '/' + id"
    :key="id"
    tag="span"
    style="cursor: pointer">
    <v-card
      :color="type === 'item' ? 'LogoItemColor' : 'LogoFlowColor'"
      @mouseover="cardHover = true"
      @mouseleave="cardHover = false">
      <v-btn
        absolute
        fab
        top
        left
        small
        color="white"
        @click.native.stop=""
        v-show="cardHover"
        class="select_btn"
        style="width: 24px; height: 24px; left: -12px; top: -12px;"
      >
        <v-icon>done</v-icon>
      </v-btn>
      <div class="px-2 py-2">
        <div class="itemflow-title word-overflow-hidden">{{ title || 'no title' }}</div>
        <div class="itemflow-message word-overflow-hidden">{{ message || 'no message' }}</div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
  export default {
    props: ['id', 'type', 'title', 'message'],
    data () {
      return {
        cardHover: false
      }
    }
  }
</script>

<style scoped>
.itemflow-title {
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.87);
  line-height: normal;
}
.itemflow-message {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  line-height: normal;
}
.word-overflow-hidden {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>
