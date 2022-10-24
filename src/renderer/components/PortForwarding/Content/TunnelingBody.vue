<template>
  <v-container
      fluid
      class="session-body"
  >
    <v-row dense>
      <v-col
          v-for="session in list"
          :cols="getDisplayCol"
      >
        <div
            @mouseenter.prevent="isShowMenu(true)"
            @mouseleave.prevent="isShowMenu(false)"
        ><Card
          rounded="15"
          elevation="24"
          :color="isDarkMode($vuetify) ? '#424242' : '#E0E0E0'"
        >
        <template v-slot:title>
          <v-icon large>{{ getTunnelingBodyTitleIcon(session) }}</v-icon>
          <h4>{{ session.host }}</h4>
          <v-spacer />
          <!-- v-show="isMenu" -->
          <div>
            <v-btn icon>
              <v-icon>{{ Defs.ICON_CONNECTION }}</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>{{ Defs.ICON_CARD_TEXT }}</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>{{ Defs.ICON_CARD_REMOVE }}</v-icon>
            </v-btn>
          </div>
        </template>

        <template v-slot:text>
          <h4>{{ getTunnelingBodyText(session) }}</h4>
        </template>
        </Card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { Card } from '@/components/Layout'

export default {
  name: "SessionBody",
  components: {
    Card
  },
  data: () => {
    return {
      list: [],
      isMenu: false
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('Vuetify', ['isDarkMode', 'getCurDisplay']),
    ...mapGetters('PortForwarding', ['getTunnelingBodyTitleIcon', 'getTunnelingBodyText']),
    getDisplayCol () {
      const display = this.getCurDisplay(this.$vuetify)

      if (display !== null && display.length > 0) {
        switch (display) {
          case 'xs':
            return 12
          case 'sm':
            return 12
          case 'md':
            return 6
          case 'lg':
            return 4
          case 'xl':
            return 4
          default:
            break
        }
      }
    }
  },
  watch: {
    state: {
      handler () {
        if (this.state.arrTunneling.length > 0) {
          this.list = this.state.arrTunneling
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    isShowMenu (boolean) {
      this.isMenu = boolean
    }
  }
}
</script>

<style scoped>
.session-body {
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.session-body::-webkit-scrollbar {
  display:none;
}
</style>
