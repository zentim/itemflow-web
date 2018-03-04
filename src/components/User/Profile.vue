<template>
  <v-layout>
    <v-flex>
      <div>
        {{ user.id }}
        {{ user.email }}
      </div>
      <v-btn @click="onLogout" class="primary">Logout</v-btn>
    </v-flex>

    <v-flex>
      <ais-index
        app-id="latency"
        api-key="3d9875e51fbd20c7754e65422f7ce5e1"
        index-name="bestbuy"
      >
        <ais-search-box></ais-search-box>
        <ais-results>
          <template slot-scope="{ result }">
            <h2>
              <ais-highlight :result="result" attribute-name="name"></ais-highlight>
            </h2>
          </template>
        </ais-results>
      </ais-index>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
