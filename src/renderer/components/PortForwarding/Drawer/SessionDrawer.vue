<template>
  <v-navigation-drawer
    v-model="drawer"
    width="450"
    right
    absolute
    temporary
  >

  <!--
     0: Direction Page
     1: Source Page
     2: Server Page
     3: Destination Page
  -->

  <directionPage
    v-show="getDrawerPage() === 0"
    v-on:msgClose="close"
  ></directionPage>

  <sourcePage
    v-show="getDrawerPage() === 1"
    v-on:msgClose="close"
  ></sourcePage>

  <serverPage
    v-show="getDrawerPage() === 2"
    v-on:msgClose="close"
  ></serverPage>

  <destinationPage
    v-show="getDrawerPage() === 3"
    v-on:msgClose="close"
  ></destinationPage>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['getDrawerPage'])
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
