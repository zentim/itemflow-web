<template>
  <v-app id="inspire">

    <!-- nav -->
    <v-toolbar
      light
      fixed
      clipped-right
      color="secondary"
      app
      dense
      v-if="userIsAuthenticated"
    >
      <!-- nav - logo -->
      <v-toolbar-title v-if="inItemPage">
        <router-link to="/items" tag="span" style="cursor: pointer" class="LogoItemColor">
          Item
        </router-link>
        <router-link to="/flows" tag="span" style="cursor: pointer">
          Flow
        </router-link>
      </v-toolbar-title>

      <v-toolbar-title v-else-if="inFlowPage">
        <router-link to="/items" tag="span" style="cursor: pointer">
          Item
        </router-link>
        <router-link to="/flows" tag="span" style="cursor: pointer" class="LogoFlowColor">
          Flow
        </router-link>
      </v-toolbar-title>

      <v-toolbar-title v-else>
        <router-link to="/items" tag="span" style="cursor: pointer">
          Item
        </router-link>
        <router-link to="/flows" tag="span" style="cursor: pointer">
          Flow
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>

      <!-- search -->
      <v-card class="mr-0 hidden-md-and-down" color="secondary" flat>
        <v-text-field
          prepend-icon="search"
          label="Search"
          solo-inverted
        ></v-text-field>
      </v-card>
    </v-toolbar>





    <!-- main -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <speed-dial></speed-dial>


    <!-- right -->
    <v-navigation-drawer
      fixed
      right
      clipped
      app
      :value="rightDrawer"
      :hide-overlay="rightDrawer"
      width="250"
      v-if="userIsAuthenticated"
    >
      <v-card class="hidden-lg-and-up" color="secondary" flat>
        <v-text-field
          prepend-icon="search"
          label="Search"
          solo-inverted
        ></v-text-field>
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

      <v-list  class="my-5 py-5" v-if="userIsAuthenticated">
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
      </v-list>
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
        return [{ icon: 'home', title: 'Home', link: '/' }]
      },
      menuItemsBottom () {
        return [{ icon: 'account_box', title: 'Profile', link: '/profile' }]
      },
      inItemPage () {
        let routeName = this.$route.name
        if (routeName === 'Item' || routeName === 'Items' || routeName === 'CreateItem') {
          return true
        }
        return false
      },
      inFlowPage () {
        let routeName = this.$route.name
        if (routeName === 'Flow' || routeName === 'Flows' || routeName === 'CreateFlow') {
          return true
        }
        return false
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>
