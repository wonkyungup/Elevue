<template>
  <v-container
      fluid
      class="session-body"
  >
    <v-row dense>
      <template v-for="(item, index) in items">
        <v-col
            :key="index"
            :cols="getDisplayCol($vuetify)"
        >
          <v-hover v-slot="{ hover }">
            <Card
                rounded="lg"
                elevation="24"
                :color="isDarkMode($vuetify) ? '#424242' : '#E0E0E0'"
            >
              <template v-slot:title>
                <v-icon large style="letter-spacing: 3px;">{{ getTunnelingBodyTitleIcon(item) }}</v-icon>
                <h4>{{ item.host }}</h4>
                <v-spacer />
                <div v-show="hover" >
                  <v-btn
                    icon
                    small
                    @click="onClickConnect(item)"
                  ><v-icon>{{ Defs.ICON_CONNECTION }}</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      small
                      @click="onClickEdit(item)"
                  >
                    <v-icon>{{ Defs.ICON_CARD_TEXT }}</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      small
                      @click="onClickDelete(item)"
                  ><v-icon>{{ Defs.ICON_CARD_REMOVE }}</v-icon>
                  </v-btn>
                </div>
              </template>

              <template v-slot:text>
                <h4>{{ getTunnelingBodyText(item) }}</h4>
              </template>
            </Card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Card } from '@/components/Layout'
import SessionListener from '@/assets/js/ssh/SessionListener'
import Session from '@/assets/js/ssh'

export default {
  name: "SessionBody",
  components: {
    Card
  },
  data: () => {
    return {
      items: [],
      isMenu: false
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('Vuetify', ['isDarkMode']),
    ...mapGetters('PortForwarding', ['getTunnelingBodyTitleIcon', 'getTunnelingBodyText', 'getDisplayCol'])
  },
  watch: {
    state: {
      handler () {
        if (this.state.arrTunneling.length > 0) {
          this.items = this.state.arrTunneling
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['setSelectID']),
    setSessionListener (sessionListener) {
      sessionListener.on(SessionListener.MSG_SESSION_CONNECT_ATTEMPT, async (session) => {
        session._stusConnect = SessionListener.MSG_SESSION_CONNECT_ATTEMPT
        console.log(session)
        await session.doSSHConnect()
      })

      sessionListener.on(SessionListener.MSG_SESSION_CONNECTED, (session) => {
        session._stusConnect = SessionListener.MSG_SESSION_CONNECTED
        console.log(session)
      })

      sessionListener.on(SessionListener.MSG_SESSION_DISCONNECTED, async (session) => {
        session._stusConnect = SessionListener.MSG_SESSION_DISCONNECTED
        console.log(session)
        await session.disconnect()
      })

      sessionListener.on(SessionListener.MSG_SESSION_ERROR, async (session) => {
        session._stusConnect = SessionListener.MSG_SESSION_ERROR
        console.log(session)
        await session.disconnect()
      })
    },
    onClickConnect (session) {
      const sessionListener = new SessionListener()
      session = new Session(sessionListener, session)
      
      if (session) {
        this.setSessionListener(session._sessionListener)
        console.log(session)
        session.openTunnel()
      }
    },
    onClickEdit (session) {
      const id = session.id

      if (id > 0) {
        this.setSelectID(id)
        this.$emit('msgClickEditButton')
      }
    },
    onClickDelete (session) {
      const id = session.id

      if (id > 0) {
        this.setSelectID(id)
        this.$emit('msgClickDeleteButton')
      }
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
