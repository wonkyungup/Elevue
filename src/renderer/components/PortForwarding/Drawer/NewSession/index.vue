<template>
  <v-navigation-drawer
    v-model="drawer"
    width="450"
    right
    absolute
    temporary
  >
  <titlePage v-on:msgClose="close" />

  <v-card height="64" elevation="0" color="transparent" rounded="0" class="pa-0" />
  <directionPage v-if="isDrawerDirection()" />
  <sourcePage v-else-if="isDrawerSource()" />
  <serverPage v-else-if="isDrawerServer()" />
  <destinationPage v-else-if="isDrawerDestination()" />
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
  titlePage,
  directionPage,
  sourcePage,
  serverPage,
  destinationPage
} from './template'
import DB from '@/model'

export default {
  name: "NewSession",
  components: {
    titlePage,
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
          const db = new DB()
          const session = this.state.session

          db.insertPortForwardingItem(session).then(row => {
            if (row.id > 0) {
              this.$emit('msgNewSession', row)
              this.close()
            }
          })
        }
      },
      immediate: true,
      deep: false
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keyDownHandler)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDownHandler)
  },
  methods: {
    ...mapActions('PortForwarding', ['clearSessionValue']),
    keyDownHandler (event) {
      switch (event.keyCode) {
        case 27: // ESC
          this.close()
          break
        default:
          break
      }
    },
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
