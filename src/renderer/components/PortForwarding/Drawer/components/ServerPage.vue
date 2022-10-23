<template>
  <div>
    <!-- Title -->
    <v-list-item>
      <v-btn icon color="primary" @click="onClickBack">
        <v-icon>{{ Defs.ICON_ARROW_LEFT }}</v-icon>
      </v-btn>

      <v-list-item-content>
        <v-list-item-title class="text-h6 font-weight-bold">
          {{ getDirectionTitle() }} Port Forwarding
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar>
        <v-btn icon @click="close">
          <v-icon>{{ Defs.ICON_ARROW_COLLAPSE_RIGHT }}</v-icon>
        </v-btn>
      </v-list-item-avatar>
    </v-list-item>

    <!-- Context -->
    <v-list dense>
      <Card :isSubTitle="false">
        <template v-slot:title>
          <p v-if="isRemote()" class="text-sm-body-1">Select the remote host:</p>
          <p v-else class="text-sm-body-1">Set the local port and binding address:</p>
        </template>

        <template v-slot:text>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="2" align="center">
                <v-icon
                  x-large
                  v-show="isLocal() || isSocksv5()"
                  disabled
                >{{ Defs.ICON_ACCOUNT }}</v-icon>
                <v-icon
                  x-large
                  v-show="isRemote()"
                  disabled
                >{{ Defs.ICON_SERVER }}</v-icon>
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
                <v-icon
                  x-large
                  v-show="isLocal()"
                  disabled
                >{{ Defs.ICON_SERVER }}</v-icon>

                <v-icon
                  x-large
                  v-show="isRemote()"
                  disabled
                >{{ Defs.ICON_ACCOUNT }}</v-icon>

                <v-icon
                  x-large
                  v-show="isSocksv5()"
                  disabled
                >{{ Defs.ICON_CLOUD }}</v-icon>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <v-row align="center" dense>
              <v-col cols="12" align="left">
                <strong></strong>
                <strong v-show="isLocal()">The device is used as an intermediate host to access the remote host.</strong>
                <strong v-show="isRemote()">The traffic from this port will be forwarded to the destination host.</strong>
                <strong v-show="isSocksv5()">The intermediate host will receive the traffic that will be forwarded to the local (current) host.</strong>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:actions>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="7">
                <v-text-field
                  autofocus
                  v-model="hostname"
                  placeholder="Server Address"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="port"
                  placeholder="Port"
                  outlined
                  dense
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="username"
                  placeholder="Username"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="password"
                  placeholder="Password"
                  outlined
                  dense
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="10">
                <v-btn
                  block
                  color="primary"
                  @click="onClickContinue"
                  :disabled="isDisabled"
                >Continue</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </Card>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Card } from '@/components/Layout'

export default {
  name: "ServerPage",
  components: {
    Card
  },
  data: () => {
    return {
      hostname: '',
      port: null,
      username: '',
      password: ''
    }
  },
  watch: {
    'state.curDrawer': {
      handler () {
        if (this.isDrawerSource()) {
          this.hostname = ''
          this.port = ''
          this.username = ''
          this.password = ''
        }
      },
      immediate: false,
      deep: true
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', [
      'getDirectionTitle',
      'isLocal',
      'isRemote',
      'isSocksv5',
      'isDrawerSource'
    ]),
    isDisabled () {
      return (!this.hostname || !this.port || !this.username || !this.password)
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['moveBackButton', 'setSessionValue', 'moveNextButton']),
    close () {
      this.$emit('msgClose')
    },
    onClickBack () {
      this.moveBackButton()
    },
    onClickContinue () {
      const hostname = this.hostname
      const port = this.port
      const username = this.username
      const password = this.password

      if (hostname && port && username && password) {
        this.setSessionValue({ hostname, port, username, password })
        this.moveNextButton()
      }
    }
  }
}
</script>

<style scoped>

</style>
