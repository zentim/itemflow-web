<template>
  <v-layout>
    <v-card class="d-flex" color="LogoItemColor">
      <v-card-title>
        <div>
          <h3>{{ obj.title }}</h3>
          <div>{{ obj.message || 'no message' }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="primary" :to="'/items/' + obj.id">
          <v-icon left light>arrow_forward</v-icon>
          View
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        obj: this.item
      }
    }
  }
</script>
