<template>
  <v-navigation-drawer
      v-model="drawer"
      width="450"
      left
      absolute
      temporary
  >
    <v-app-bar height="64" fixed hide-on-scroll class="pa-0">
      <v-list-item class="pa-0">
        <v-list-item-content class="pa-0">
          <v-list-item-title class="text-h6 font-weight-bold">
            Delete Port Forwarding Session
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
                <v-icon x-large v-show="isLocal() || isSocksv5()" disabled>{{ Defs.ICON_ACCOUNT }}</v-icon>
                <v-icon x-large v-show="isRemote()" disabled>{{ Defs.ICON_SERVER }}</v-icon>
              </v-col>
              <v-col cols="2" align="center">
                <v-progress-linear
                    color="primary"
                    value="0"
                    rounded
                    height="6"
                ></v-progress-linear>
              </v-col>
              <v-col cols="2" align="center">
                <v-icon x-large disabled>{{ Defs.ICON_SERVER_SECURITY }}</v-icon>
              </v-col>
              <v-col cols="2" align="center">
                <v-progress-linear
                    color="primary"
                    value="0"
                    rounded
                    height="6"
                ></v-progress-linear>
              </v-col>
              <v-col cols="2" align="center">
                <v-icon x-large v-show="isLocal()" disabled>{{ Defs.ICON_SERVER }}</v-icon>
                <v-icon x-large v-show="isRemote()" disabled>{{ Defs.ICON_ACCOUNT }}</v-icon>
                <v-icon x-large v-show="isSocksv5()" disabled>{{ Defs.ICON_CLOUD }}</v-icon>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:actions>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="isRemote() ? state.session['destination_host'] : state.session['source_host']"
                    disabled
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="isRemote() ? state.session['destination_port'] : state.session['source_port']"
                    disabled
                    outlined
                    dense
                    type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="state.session['host']"
                    outlined
                    dense
                    disabled
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="state.session['port']"
                    outlined
                    dense
                    disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="state.session['username']"
                    outlined
                    dense
                    disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="state.session['password']"
                    disabled
                    outlined
                    dense
                    type="password"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="8">
                <v-text-field
                    v-model="isRemote() ? state.session['source_host'] : state.session['destination_host']"
                    disabled
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="isRemote() ? state.session['source_port'] : state.session['destination_port']"
                    disabled
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
                      placeholder="delete session"
                      color="error"
                      :error="isDeleteInputError"
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn
                      icon
                      color='red'
                      :disabled="isValidToDelete"
                      @click="onDeleteSession"
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
import DB from '@/model'

export default {
  name: "DeleteSession",
  components: {
    Card
  },
  data: () => {
    return {
      drawer: false,
      str: 'delete session',
      isDeleteInputError: false,
      input: ''
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5']),
    isValidToDelete () {
      return this.input !== this.str
    }
  },
  watch: {
    input: {
      handler () {
        this.isDeleteInputError = false
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
      this.isDeleteInputError = false
      this.input = ''
    },
    close () {
      this.drawer = false
    },
    open () {
      this.clearValue()
      this.drawer = true
    },
    async onDeleteSession () {
      const db = new DB()
      const id = this.state.selectID

      try {
        const deleted = await db.deletePortForwardingItem(id)
        if (deleted) {
          this.deletedArrTunneling()
          this.close()
        }
      } catch (e) {
        console.log('session delete error!')
        this.isDeleteInputError = true
      }
    }
  }
}
</script>

<style scoped>

</style>