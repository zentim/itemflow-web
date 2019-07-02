<template>
  <v-app id="app">
    <!-- snackbar -->
    <app-snackbar></app-snackbar>

    <!-- nav -->
    <v-toolbar
      light
      fixed
      flat
      clipped-right
      clipped-left
      color="secondary"
      app
      dense
      v-if="userIsAuthenticated"
      class="vtoolbar"
    >
      <div class="ml-1 hidden-lg-and-up" v-if="$route.name === 'Home'">
        <v-toolbar-side-icon class="mx-0 px-0" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </div>
      <div class="ml-1" v-else>
        <v-icon large color="primary" style="cursor: pointer" @click="goto">arrow_back</v-icon>
      </div>
      <!-- nav - logo -->
      <v-btn flat class="text-lowercase">
        <router-link to="/" tag="span" style="cursor: pointer" class="title">Itemflow</router-link>
      </v-btn>

      <!-- Search -->
      <div v-if="$route.name === 'Home'" style="width: 100%">
        <app-search></app-search>
      </div>

      <v-spacer></v-spacer>

      <!-- nav right part -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/new">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn flat to="/favorite">
          <v-icon>star</v-icon>
        </v-btn>
        <v-btn flat to="/profile">
          <v-icon>account_box</v-icon>
        </v-btn>
        <v-btn flat to="/trash">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-toolbar-items>

      <!-- DrawerController -->
      <v-icon
        class="mx-1"
        large
        style="cursor: pointer"
        @click.stop="toggleRightDrawer"
        v-show="($route.name === 'Itemflow' || $route.name === 'New') && !rightDrawer"
      >search</v-icon>
      <v-icon
        class="mx-1"
        large
        style="cursor: pointer"
        @click.stop="toggleRightDrawer"
        v-show="($route.name === 'Itemflow' || $route.name === 'New') && rightDrawer"
      >keyboard_tab</v-icon>
      <!-- Search -->
      <div
        style="width: 250px; margin-right: 0px"
        v-show="rightDrawer && ($route.name === 'Itemflow' || $route.name === 'New')"
      >
        <app-search></app-search>
      </div>
    </v-toolbar>

    <!-- main -->
    <v-content style="background-color: #fff">
      <router-view></router-view>
    </v-content>

    <!-- left -->
    <v-navigation-drawer
      fixed
      :mini-variant="mini"
      light
      class="secondary hidden-md-and-up"
      v-model="drawer"
      v-if="drawer"
      app
    >
      <v-list v-if="!userIsAuthenticated">
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon large slot="activator">home</v-icon>
              <span>Home</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="my-5 py-5" v-if="userIsAuthenticated">
        <v-list-tile v-for="item in menuItemsTop" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon large slot="activator">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="my-5 py-5" v-if="userIsAuthenticated">
        <v-list-tile v-for="item in menuItemsMiddle" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon large slot="activator">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      mini: true
    }
  },
  computed: {
    menuItemsTop () {
      return [
        { icon: 'add', title: 'Add Item', link: '/new' }
      ]
    },
    menuItemsMiddle () {
      return [
        { icon: 'home', title: 'Home', link: '/' },
        { icon: 'star', title: 'Favorite', link: '/favorite' },
        { icon: 'account_box', title: 'Profile', link: '/profile' },
        { icon: 'delete', title: 'Trash', link: '/trash' }
      ]
    },
    menuItemsBottom () {
      return [{ icon: 'account_box', title: 'Profile', link: '/profile' }]
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    rightDrawer () {
      return this.$store.getters.rightDrawer
    }
  },
  methods: {
    goto () {
      if (this.$route.name === 'Itemflow') {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    toggleRightDrawer () {
      let rightDrawer = this.rightDrawer
      this.$store.dispatch('setRightDrawer', !rightDrawer)
    }
  }
}
</script>
<style scoped>
.coverArea {
  background-color: rgba(0, 0, 0, 0.1);
  width: 60%;
  height: 100%;
  position: absolute;
  top: 100px;
  right: 0;
  z-index: 10;
}
.vtoolbar .v-toolbar__content {
  padding: 0;
}
</style>
