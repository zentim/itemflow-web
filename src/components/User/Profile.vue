<template>
  <v-container>
    <v-layout row wrap style="background: linear-gradient(#e66465, #9198e5);">
      <v-flex xs12 md4 >
        <template>
          <v-jumbotron dark>
            <v-container fill-height row wrap>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <div class="my-3">
                    <v-avatar class="orange">
                      <span class="white--text headline">{{ user.email.slice(0, 1) }}</span>
                    </v-avatar>
                    <h3 class="headline d-inline-block mx-1">{{ user.email }}</h3>
                  </div>
                  <v-btn @click="onLogout" class="primary">Logout</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </template>
      </v-flex>
      <v-flex xs12 md8>
        <template>
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <h3 class="display-2">I have <span primary style="font-weight: 600" class="display-3">{{ itemflowLength }}</span> ItemFlow</h3>
                  <h3 >Items: <span primary style="color: #004D40; font-weight: 400" class="display-2 px-3">{{ itemsLength }}</span></h3>
                  <h3 >Flows: <span primary style="color: #01579B; font-weight: 400" class="display-2 px-3">{{ flowsLength }}</span></h3>
                  <v-btn color="success" @click="exportData" :disabled="importing">export data</v-btn>
                  <v-btn color="success" @click="importData" :disabled="importing" :loading="importing">import data</v-btn>
                  <input type="file" id="selectFiles" ref="fileInput" value="Import" style="display: none" @change="onFilePicked"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      },
      itemflowLength () {
        return this.$store.getters.loadedItemFlow.filter(obj => {
          return !obj.deletedDate
        }).length
      },
      itemsLength () {
        return this.$store.getters.loadedItemFlow.filter(obj => {
          return obj.type === 'item' && !obj.deletedDate
        }).length
      },
      flowsLength () {
        return this.$store.getters.loadedItemFlow.filter(obj => {
          return obj.type === 'flow' && !obj.deletedDate
        }).length
      },
      importing () {
        return this.$store.getters.importing
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      },
      exportData () {
        this.$store.dispatch('exportData')
      },
      importData () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }

        let fr = new FileReader()
        fr.addEventListener('load', (e) => {
          let result = JSON.parse(e.target.result)
          this.$store.dispatch('importData', result)
        })
        fr.readAsText(files.item(0))
      }
    }
  }
</script>
