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
                >{{ Defs.ICON_SERVER_SECURITY }}</v-icon>
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
                <v-icon
                    x-large
                    v-show="isLocal()"
                >{{ Defs.ICON_SERVER }}</v-icon>

                <v-icon
                    x-large
                    v-show="isRemote()"
                >{{ Defs.ICON_ACCOUNT }}</v-icon>

                <v-icon
                    x-large
                    v-show="isSocksv5()"
                >{{ Defs.ICON_CLOUD }}</v-icon>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <v-row align="center" dense>
              <v-col cols="12" align="left">
                <strong v-show="isLocal()">IP hostname and the port of the remote host where the intermediate host will direct the traffic.</strong>
                <strong v-show="isRemote()">The destination address an port where the traffic will be forwarded</strong>
                <strong v-show="isSocksv5()">This port will be open on the local (current) machine to forward traffic to the remote host.</strong>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:actions>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="10">
                <v-text-field
                    v-show="!isSocksv5()"
                    autofocus
                    v-model="hostname"
                    placeholder="Binding Address"
                    outlined
                    dense
                ></v-text-field>
                <v-text-field
                    v-show="isSocksv5()"
                    :value="state.session.localHost"
                    disabled
                    outlined
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                    v-show="!isSocksv5()"
                    v-model="port"
                    placeholder="Port"
                    outlined
                    dense
                    type="number"
                ></v-text-field>
                <v-text-field
                    v-show="isSocksv5()"
                    :value="state.session.localPort"
                    disabled
                    outlined
                    dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center" dense>
              <v-col cols="10">
                <v-btn
                    block
                    color="primary"
                    @click="onClickContinue"
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
  name: "DestinationPage",
  components: {
    Card
  },
  data: () => {
    return {
      hostname: 'localhost',
      port: null
    }
  },
  watch: {
    'state.curDrawer': {
      handler () {
        if (this.isDrawerServer()) {
          this.hostname = 'localhost'
          this.port = null
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
      'isDrawerServer'
    ])
  },
  methods: {
    ...mapActions('PortForwarding', ['moveBackButton', 'setSessionValue', 'moveNextButton']),
    close () {
      this.$emit('msgClose')
    },
    onClickBack () {
      this.moveBackButton()
    },
    async onClickContinue () {
      let hostname = ''
      let port = null

      if (this.isLocal() || this.isRemote()) {
        hostname = this.hostname
        port = this.port
      }

      if (this.isSocksv5()) {
        const session = this.state.session

        hostname = session.localHost
        port = session.localPort
      }

      if (hostname && port) {
        this.setSessionValue({ hostname, port })
        this.moveNextButton()
      }
    }
  }
}
</script>

<style scoped>

</style>
