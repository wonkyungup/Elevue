<template>
  <v-navigation-drawer
      v-model="drawer"
      width="450"
      left
      absolute
      temporary
      @keydown.esc.prevent="close"
  >
    <v-app-bar height="64" fixed hide-on-scroll class="pa-0">
      <v-list-item class="pa-0">
        <v-list-item-content class="pa-0">
          <v-list-item-title class="text-h6 font-weight-bold">
            Edit Port Forwarding Session
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar class="pa-0">
          <v-btn icon @click="close">
            <v-icon>{{ Defs.ICON_ARROW_COLLAPSE_LEFT }}</v-icon>
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>
    </v-app-bar>

    <v-card height="64" elevation="0" color="transparent" rounded="0" class="pa-0" />

    <v-list dense>
      <Card
          :isTitle="false"
          :isSubTitle="false"
      >
        <template v-slot:text>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="2" align="center">
                <v-icon x-large v-show="isLocal() || isSocksv5()">{{ Defs.ICON_ACCOUNT }}</v-icon>
                <v-icon x-large v-show="isRemote()">{{ Defs.ICON_SERVER }}</v-icon>
              </v-col>
              <v-col cols="2" align="center">
                <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
              </v-col>
              <v-col cols="2" align="center">
                <v-icon x-large>{{ Defs.ICON_SERVER_SECURITY }}</v-icon>
              </v-col>
              <v-col cols="2" align="center">
                <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
              </v-col>
              <v-col cols="2" align="center">
                <v-icon x-large v-show="isLocal()">{{ Defs.ICON_SERVER }}</v-icon>
                <v-icon x-large v-show="isRemote()">{{ Defs.ICON_ACCOUNT }}</v-icon>
                <v-icon x-large v-show="isSocksv5()">{{ Defs.ICON_CLOUD }}</v-icon>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:actions>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="isRemote() ? session['destination_host'] : session['source_host']"
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="isRemote() ? session['destination_port'] : session['source_port']"
                    outlined
                    dense
                    type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="session['host']"
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="session['port']"
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="session['username']"
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="session['password']"
                    outlined
                    dense
                    type="password"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="isRemote() ? session['source_host'] : session['destination_host']"
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="isRemote() ? session['source_port'] : session['destination_port']"
                    outlined
                    dense
                    type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="12" class="pb-0">
                <p class="text-h6 pa-0 ma-0">Are you sure you want to <strong class="font-italic font-weight-bold">{{ str }}</strong>?</p>
                <strong class="body-2">
                  - wish to {{ str }}, please enter: <strong class="font-italic font-weight-thin">{{ str }}</strong>
                </strong>
              </v-col>
              <v-row dense justify="center" class="pt-2">
                <v-col cols="10">
                  <v-text-field
                      v-model="input"
                      dense
                      outlined
                      placeholder="edit session"
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn
                      icon
                      color='primary'
                      :disabled="isValidToEdit"
                      @click="onClickEditButton"
                  >
                    <v-icon>{{ Defs.ICON_ARROW_RIGHT_CIRCLE }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </template>
      </Card>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Card } from '@/components/Layout'
import Security from '@/assets/js/security'
import DB from '@/model'

export default {
  name: "EditSession",
  components: {
    Card
  },
  data: () => {
    return {
      drawer: false,
      str: 'edit session',
      input: '',
      session: {}
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5']),
    isValidToEdit () {
      return this.input !== this.str
    }
  },
  watch: {
    drawer: {
      handler () {
        this.clearValue()
        if (this.drawer) {
          const session = this.session
          const curSession = this.state.session

          session['id'] = curSession['id']
          session['direction'] = curSession['direction']
          session['source_host'] = curSession['source_host']
          session['source_port'] = curSession['source_port']
          session['host'] = curSession['host']
          session['port'] = curSession['port']
          session['username'] = curSession['username']
          session['password'] = curSession['password']
          session['destination_host'] = curSession['destination_host']
          session['destination_port'] = curSession['destination_port']
          session['authentication_method'] = curSession['authentication_method']
          session['passphrase'] = curSession['passphrase']
          session['private_key_id'] = curSession['private_key_id']
        }
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keyDownHandler)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDownHandler)
  },
  methods: {
    ...mapActions('PortForwarding', ['deletedArrTunneling']),
    keyDownHandler (event) {
      switch (event.keyCode) {
        case 27: // ESC
          this.close()
          break
        default:
          break
      }
    },
    clearValue () {
      this.input = ''
      this.session = {}
    },
    close () {
      this.drawer = false
    },
    open () {
      this.drawer = true
    },
    onClickEditButton () {
      const db = new DB()
      const session = this.session

      session['password'] = Security.encodeData(session['password'])
      db.updatePortForwardingItem(session).then(isUpdated => {
        if (isUpdated) {
          // session arrTunneling change
        }
      })
    }
  }
}
</script>

<style scoped>

</style>