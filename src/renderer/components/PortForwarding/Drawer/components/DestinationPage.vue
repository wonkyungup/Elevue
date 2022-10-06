<template>
  <div>
    <!-- Title -->
    <v-list-item>
      <v-btn icon color="primary" @click="onClickBack">
        <v-icon>{{ arrowLeft }}</v-icon>
      </v-btn>

      <v-list-item-content>
        <v-list-item-title class="text-h6 font-weight-bold">
          {{ getDirectionTitle() }} Port Forwarding
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar>
        <v-btn icon @click="close">
          <v-icon>{{ arrowCollapseRight }}</v-icon>
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
                    :disabled="state.isDestinationPage"
                >{{ account }}</v-icon>
                <v-icon
                    x-large
                    v-show="isRemote()"
                    :disabled="state.isDestinationPage"
                >{{ server }}</v-icon>
              </v-col>
              <v-col cols="2" align="center">
                <v-progress-linear
                    color="primary"
                    :indeterminate="!state.isDestinationPage"
                    rounded
                    height="6"
                ></v-progress-linear>
              </v-col>
              <v-col cols="2" align="center">
                <v-icon x-large :disabled="state.isDestinationPage">{{ server }}</v-icon>
              </v-col>
              <v-col cols="2" align="center">
                <v-progress-linear
                    color="primary"
                    :indeterminate="!state.isDestinationPage"
                    rounded
                    height="6"
                ></v-progress-linear>
              </v-col>
              <v-col cols="2" align="center">
                <v-icon
                    x-large
                    v-show="isLocal()"
                >{{ server }}</v-icon>

                <v-icon
                    x-large
                    v-show="isRemote()"
                >{{ account }}</v-icon>

                <v-icon
                    x-large
                    v-show="isSocksv5()"
                >{{ cloud }}</v-icon>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <v-row align="center" dense>
              <v-col cols="12" align="left">
                <strong v-show="isLocal()">This port will be open on the local (current) machine to forward traffic to the remote host.</strong>
                <strong v-show="isRemote()">Select a host where the port will be open. The traffic from this port will be forwarded to the destination host.</strong>
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
                    :value="state.session.remoteHost"
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
                    :value="state.session.remotePort"
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
import Defs from '@/assets/js/constants'

export default {
  name: "DestinationPage",
  components: {
    Card
  },
  data: () => {
    return {
      arrowCollapseRight: Defs.ICON_ARROW_COLLAPSE_RIGHT,
      arrowLeft: Defs.ICON_ARROW_LEFT,
      account: Defs.ICON_ACCOUNT,
      server: Defs.ICON_SERVER,
      cloud: Defs.ICON_CLOUD,
      hostname: '',
      port: null
    }
  },
  watch: {
    'state.isServerPage': {
      handler () {
        this.hostname = ''
        this.port = null
      },
      immediate: false,
      deep: true
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['getDirectionTitle', 'isLocal', 'isRemote', 'isSocksv5'])
  },
  methods: {
    ...mapActions('PortForwarding', ['backDestinationPage', 'setContinueDestinationPage', 'setSessionDestinationPage']),
    close () {
      this.$emit('msgClose')
    },
    onClickBack () {
      this.backDestinationPage()
    },
    onClickContinue () {
      if (this.isLocal() || this.isRemote()) {
        const hostname = this.hostname
        const port = this.port

        if (hostname && port) {
          this.setSessionDestinationPage({ hostname, port })
        }
      }

      this.setContinueDestinationPage()
    }
  }
}
</script>

<style scoped>

</style>
