<template>
  <v-container
      fluid
      class="session-body"
  >
    <v-row dense>
      <template v-for="(item, index) in arrTunnel">
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
                <v-icon large style="letter-spacing: 3px;">{{ getTunnelingBodyTitleIcon(item['_session']) }}</v-icon>
                <h4>{{ item['_session'].host }}</h4>
                <v-spacer />
                <div v-show="hover" >
                  <v-btn
                    v-if="item['_isConnect']"
                    icon
                    small
                    @click="onClickDisconnect(item)"
                  ><v-icon>{{ Defs.ICON_STOP }}</v-icon></v-btn>

                  <v-btn
                    v-else
                    icon
                    small
                    @click="onClickConnect(item)"
                  ><v-icon>{{ Defs.ICON_PLAY }}</v-icon></v-btn>
<!--                  edit text = :disabled="item['_isConnect']"-->
                  <v-btn
                      icon
                      small
                      disabled
                      @click="onClickEdit(item['_session'])"
                  >
                    <v-icon>{{ Defs.ICON_TEXT }}</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      small
                      :disabled="item['_isConnect']"
                      @click="onClickDelete(item['_session'])"
                  ><v-icon>{{ Defs.ICON_TRASH }}</v-icon>
                  </v-btn>
                </div>
              </template>

              <template v-slot:text>
                <h4>{{ getTunnelingBodyText(item['_session']) }}</h4>
              </template>

              <template v-slot:actions>
                <v-alert
                  v-model="item['_alert'].isShow"
                  dismissible
                  dense
                  border="left"
                  colored-border
                  :type="item['_alert'].type"
                  :icon="item['_alert'].icon"
                  min-width="100%"
                >
                  {{ item['_alert'].content }}
                </v-alert>
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

export default {
  name: "SessionBody",
  components: {
    Card
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('Vuetify', ['isDarkMode']),
    ...mapGetters('PortForwarding', ['getTunnelingBodyTitleIcon', 'getTunnelingBodyText', 'getDisplayCol'])
  },
  props: {
    arrTunnel: Array
  },
  methods: {
    ...mapActions('PortForwarding', ['setSelectID']),
    onClickConnect (session) {
      session.doExecTunnel()
    },
    onClickDisconnect (session) {
      session.closeExecTunnel()
    },
    onClickEdit (session) {
      const id = session.id

      if (id > 0) {
        this.$emit('msgClickEditButton', id)
      }
    },
    onClickDelete (session) {
      const id = session.id

      if (id > 0) {
        this.$emit('msgClickDeleteButton', id)
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
