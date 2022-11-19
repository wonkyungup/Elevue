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
                      autofocus
                      dense
                      outlined
                      placeholder="edit session"
                      :error="isEditInputError"
                      :error-messages="isEditInputError ? 'Session update failed. Please try again in a few minutes' : ''"
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn
                      icon
                      :color="!isEditInputError ? 'primary' : 'error'"
                      :disabled="isValidToEdit"
                      @click="onClickEditButton"
                  >
                    <v-icon>{{ Defs.ICON_ARROW_RIGHT_CIRCLE }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="2" align="center">
                <v-icon x-large v-show="isLocal() || isSocksv5()" color="green">{{ Defs.ICON_ACCOUNT }}</v-icon>
                <v-icon x-large v-show="isRemote()" color="green">{{ Defs.ICON_SERVER }}</v-icon>
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
                <v-icon x-large color="cyan">{{ Defs.ICON_SERVER_SECURITY }}</v-icon>
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
                <v-icon x-large v-show="isLocal()" color="orange">{{ Defs.ICON_SERVER }}</v-icon>
                <v-icon x-large v-show="isRemote()" color="orange">{{ Defs.ICON_ACCOUNT }}</v-icon>
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
                    color="green"
                    outlined
                    dense
                    :placeholder="isRemote() ? 'destination_host' : 'source_host'"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="isRemote() ? session['destination_port'] : session['source_port']"
                    color="green"
                    outlined
                    dense
                    type="number"
                    :placeholder="isRemote() ? 'destination_port' : 'source_port'"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="session['host']"
                    color="cyan"
                    outlined
                    dense
                    placeholder="server host"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="session['port']"
                    color="cyan"
                    outlined
                    dense
                    placeholder="server port"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="session['username']"
                    color="cyan"
                    outlined
                    dense
                    placeholder="server username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="session['password']"
                    color="cyan"
                    outlined
                    dense
                    type="password"
                    placeholder="server password"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-show="!isSocksv5()"
                    v-model="isRemote() ? session['source_host'] : session['destination_host']"
                    color="orange"
                    outlined
                    dense
                    :placeholder="isRemote() ? 'source_host' : 'destination_host'"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-show="!isSocksv5()"
                    v-model="isRemote() ? session['source_port'] : session['destination_port']"
                    color="orange"
                    outlined
                    dense
                    type="number"
                    :placeholder="isRemote() ? 'source_port' : 'destination_port'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </Card>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
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
      str: 'edit',
      input: '',
      session: {},
      isEditInputError: false
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    isValidToEdit () {
      return this.input !== this.str
    }
  },
  props: {
    target: Object
  },
  watch: {
    input: {
      handler () {
        this.isEditInputError = false
      },
      immediate: false,
      deep: false
    },
    target: {
      handler () {
        const session = this.session

        session['id'] = this.target['id']
        session['direction'] = this.target['direction']
        session['source_host'] = this.target['source_host']
        session['source_port'] = this.target['source_port']
        session['host'] = this.target['host']
        session['port'] = this.target['port']
        session['username'] = this.target['username']
        session['password'] = this.target['password']
        session['destination_host'] = this.target['destination_host']
        session['destination_port'] = this.target['destination_port']
        session['authentication_method'] = this.target['authentication_method']
        session['passphrase'] = this.target['passphrase']
        session['private_key_id'] = this.target['private_key_id']
      },
      immediate: false,
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
    keyDownHandler (event) {
      switch (event.keyCode) {
        case 27: // ESC
          this.close()
          break
        default:
          break
      }
    },
    isLocal() {
      return this.target['direction'] === this.Defs.STR_LOCAL
    },
    isRemote() {
      return this.target['direction'] === this.Defs.STR_REMOTE
    },
    isSocksv5() {
      return this.target['direction'] === this.Defs.STR_SOCKSV5
    },
    close () {
      this.drawer = false
    },
    open () {
      this.drawer = true
    },
    async onClickEditButton () {
      const db = new DB()
      const session = this.session
      session['password'] = Security.encodeData(session['password'])

      if (this.isSocksv5()) {
        session['destination_host'] = session['source_host']
        session['destination_port'] = session['source_port']
      }

      try {
        const isUpdated = await db.updatePortForwardingItem(session)
        if (isUpdated) {
          this.$emit('msgUpdateSession', session)
          this.close()
        }
      } catch (err) {
        this.isEditInputError = true
      }
    }
  }
}
</script>

<style scoped>

</style>