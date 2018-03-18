<template>
  <v-app id="inspire">
    <!-- snackbar -->
    <app-snackbar></app-snackbar>


    <!-- nav -->
    <v-toolbar
      light
      fixed
      flat
      color="secondary"
      app
      dense
      v-if="userIsAuthenticated"
    >
      <div class="ml-1 hidden-md-and-down mx-0 px-0" v-if="$route.name === 'Home'">
        <v-icon large class="mx-0 px-0">home</v-icon>
      </div>
      <div class="ml-1 hidden-lg-and-up" v-if="$route.name === 'Home'">
        <v-toolbar-side-icon class="mx-0 px-0" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </div>
      <div class="ml-1" v-else>
        <!-- <router-link :to="/" tag="span" style="cursor: pointer">
          <v-icon large color="primary">arrow_back</v-icon>
        </router-link> -->
        <v-icon large color="primary" style="cursor: pointer" @click="goto">arrow_back</v-icon>
      </div>
      <!-- nav - logo -->
      <div class="mx-1">
        <router-link to="/items" tag="span" style="cursor: pointer" :class="selectColor('item')" class="title">
          Item
        </router-link>
        <router-link to="/flows" tag="span" style="cursor: pointer" :class="selectColor('flow')" class="title">
          Flow
        </router-link>
      </div>

      <!-- search -->
      <v-spacer class="hidden-md-and-down"></v-spacer>
      <app-search class="mx-1"></app-search>
      <v-spacer class="hidden-md-and-down"></v-spacer>

      <!-- nav right part -->
      <!-- <router-link to="/profile" tag="span" style="cursor: pointer" class="pr-2 hidden-lg-and-up">
        <v-icon>account_box</v-icon>
      </router-link>
      <router-link to="/star" tag="span" style="cursor: pointer" class="hidden-lg-and-up">
        <v-icon>star</v-icon>
      </router-link> -->
      <v-icon class="hidden-lg-and-up mx-1" large style="cursor: pointer" @click.stop="rightDrawer = !rightDrawer">chrome_reader_mode</v-icon>

      <!-- search -->
      <!-- <v-card class="mr-0 hidden-md-and-down" color="secondary" flat>
        <app-search></app-search>
      </v-card> -->
    </v-toolbar>





    <!-- main -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- speed dial component -->
    <!-- <speed-dial></speed-dial> -->


    <!-- right -->
    <v-navigation-drawer
      fixed
      right
      app
      :value="rightDrawer"
      :hide-overlay="rightDrawer"
      width="250"
      v-if="userIsAuthenticated"
      style="z-index: 200"
    >
      <v-icon class="hidden-lg-and-up px-2 py-2" style="cursor: pointer" large @click.stop="rightDrawer = !rightDrawer">keyboard_tab</v-icon>
      <v-card class="hidden-lg-and-up" color="secondary" flat>
        <app-search></app-search>
      </v-card>
      <right-drawer-content></right-drawer-content>
    </v-navigation-drawer>

    <!-- left -->
    <v-navigation-drawer
      fixed
      :mini-variant="mini"
      light
      class="secondary"
      v-model="drawer"
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
        <v-list-tile
          v-for="item in menuItemsTop"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon large slot="activator">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="my-5 py-5" v-if="userIsAuthenticated">
        <v-list-tile
          v-for="item in menuItemsMiddle"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon large slot="activator">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <!-- <v-list  class="my-5 py-5" v-if="userIsAuthenticated">
        <v-list-tile
          v-for="item in menuItemsBottom"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon large slot="activator">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list> -->
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        rightDrawer: null,
        mini: true
      }
    },
    computed: {
      menuItemsTop () {
        return [
          { icon: 'add', title: 'Add Item', link: '/item/new' },
          { icon: 'playlist_add', title: 'Add Flow', link: '/flow/new' }
        ]
      },
      menuItemsMiddle () {
        return [
          { icon: 'home', title: 'Home', link: '/' },
          { icon: 'star', title: 'Favorite', link: '/favorite' },
          { icon: 'account_box', title: 'Profile', link: '/profile' }
        ]
      },
      menuItemsBottom () {
        return [{ icon: 'account_box', title: 'Profile', link: '/profile' }]
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      selectColor (type) {
        let routeName = this.$route.name
        if (type === 'item') {
          if (routeName === 'Item' || routeName === 'Items' || routeName === 'CreateItem') {
            return 'LogoItemColor'
          }
        } else if (type === 'flow') {
          if (routeName === 'Flow' || routeName === 'Flows' || routeName === 'CreateFlow') {
            return 'LogoFlowColor'
          }
        }
      },
      goto () {
        if (this.$route.name === 'Item' || this.$route.name === 'Flow') {
          this.$router.go(-1)
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

