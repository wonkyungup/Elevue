<template>
  <v-navigation-drawer
    v-model="drawer"
    width="450"
    right
    absolute
    temporary
  >

  <directionPage
    v-show="state.curDrawer === Defs.DRAWER_DIRECTION_PAGE"
    v-on:msgClose="close"
  ></directionPage>

  <sourcePage
    v-show="state.curDrawer === Defs.DRAWER_SOURCE_PAGE"
    v-on:msgClose="close"
  ></sourcePage>

  <serverPage
    v-show="state.curDrawer === Defs.DRAWER_SERVER_PAGE"
    v-on:msgClose="close"
  ></serverPage>

  <destinationPage
    v-show="state.curDrawer === Defs.DRAWER_DESTINATION_PAGE"
    v-on:msgClose="close"
  ></destinationPage>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  directionPage,
  sourcePage,
  serverPage,
  destinationPage
} from './components'

export default {
  name: "SessionDrawer",
  components: {
    directionPage,
    sourcePage,
    serverPage,
    destinationPage
  },
  data: () => {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' })
  },
  watch: {
    state: {
      handler () {
        console.log(this.state)
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['clearSessionValue']),
    open () {
      this.clearSessionValue()
      this.drawer = true
    },
    close () {
      this.drawer = false
    }
  }
}
</script>
