<template>
  <router-link
    :to="'/' + type + '/' + id"
    :key="id"
    tag="span"
    style="cursor: pointer">
    <v-card :color="type === 'item' ? 'LogoItemColor' : 'LogoFlowColor'">
      <div class="px-3 py-3">
        <div class="title word-overflow-hidden" style="color: rgba(0, 0, 0, 0.87)">{{ title || 'no title' }}</div>
        <div class="word-overflow-hidden" style="color: rgba(0, 0, 0, 0.6)">{{ message || 'no message' }}</div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
  export default {
    props: ['id', 'type', 'title', 'message']
  }
</script>

<style scoped>
.word-overflow-hidden {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>
