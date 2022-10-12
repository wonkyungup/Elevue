<template>
  <v-navigation-drawer
    v-model="drawer"
    width="450"
    right
    absolute
    temporary
  >

  <directionPage
    v-show="isDrawerDirection()"
    v-on:msgClose="close"
  ></directionPage>

  <sourcePage
    v-show="isDrawerSource()"
    v-on:msgClose="close"
  ></sourcePage>

  <serverPage
    v-show="isDrawerServer()"
    v-on:msgClose="close"
  ></serverPage>

  <destinationPage
    v-show="isDrawerDestination()"
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
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', [
      'isDrawerDirection',
      'isDrawerSource',
      'isDrawerServer',
      'isDrawerDestination'
    ])
  },
  watch: {
    'state.curDrawer': {
      handler () {
        const arrBoolean = [
          this.isDrawerDirection(),
          this.isDrawerSource(),
          this.isDrawerServer(),
          this.isDrawerDestination()
        ]

        if (!arrBoolean.includes(true)) {
          this.close()
        }
      },
      immediate: true,
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
