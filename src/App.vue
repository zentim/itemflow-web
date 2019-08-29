<template>
  <v-app>
    <!-- snackbar -->
    <app-snackbar></app-snackbar>

    <!-- left -->
    <v-navigation-drawer mini-variant v-model="leftDrawer" v-if="userIsAuthenticated" app>
      <v-list>
        <v-list-item link to="/new">
          <v-icon large>mdi-plus</v-icon>
        </v-list-item>

        <v-list-item link to="/favorite">
          <v-icon large>mdi-star</v-icon>
        </v-list-item>

        <v-list-item link to="/profile">
          <v-icon large>mdi-account</v-icon>
        </v-list-item>

        <v-list-item link to="/trash">
          <v-icon large>mdi-delete</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- app bar -->
    <v-app-bar dense fixed flat v-if="userIsAuthenticated" app>
      <v-btn icon @click.stop="goto" v-if="$route.name !== 'Home'">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- logo -->
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title>itemflow</v-toolbar-title>
      </router-link>

      <!-- Search -->
      <v-spacer class="hidden-md-and-down"></v-spacer>
      <app-search></app-search>
      <v-spacer class="hidden-md-and-down"></v-spacer>

      <div class="flex-grow-1"></div>

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
        v-if="userIsAuthenticated && ($route.name == 'Itemflow' || $route.name == 'New')"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- main -->
    <v-content style="background-color: white">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- right -->
    <v-navigation-drawer
      fixed
      right
      stateless
      :value="rightDrawer"
      hide-overlay
      width="250"
      v-if="userIsAuthenticated && ($route.name == 'Itemflow' || $route.name == 'New')"
      app
    >
      <div style="position: relative">
        <v-icon
          class="hidden-lg-and-up px-2 py-2"
          style="cursor: pointer"
          large
          @click.stop="rightDrawer = !rightDrawer"
        >keyboard_tab</v-icon>
        <v-card class="hidden-lg-and-up" color="secondary" flat>
          <app-search></app-search>
        </v-card>
        <right-drawer-content></right-drawer-content>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    leftDrawer: true,
    rightDrawer: true
  }),
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    goto () {
      if (this.$route.name === 'Itemflow') {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  }
};
</script>
