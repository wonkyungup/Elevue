<template>
  <v-navigation-drawer
    v-model="drawer"
    width="450"
    right
    absolute
    temporary
  >

  <directionPage
    v-show="state.isDirectionPage"
    v-on:msgClose="close"
  ></directionPage>

  <sourcePage
    v-show="state.isSourcePage"
    v-on:msgClose="close"
  ></sourcePage>

  <serverPage
    v-show="state.isServerPage"
    v-on:msgClose="close"
  ></serverPage>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  directionPage,
  sourcePage,
  serverPage
} from './components'

export default {
  name: "SessionDrawer",
  components: {
    directionPage,
    sourcePage,
    serverPage
  },
  data: () => {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' })
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
      this.drawer = true
      this.clearSessionValue()
    },
    close () {
      this.drawer = false
    }
  }
}
</script>
