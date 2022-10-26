<template>
  <div>
    <!-- Title -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6 font-weight-bold">
          New Port Forwarding
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar>
        <v-btn icon @click="close">
          <v-icon>{{ Defs.ICON_ARROW_COLLAPSE_RIGHT }}</v-icon>
        </v-btn>
      </v-list-item-avatar>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Context -->
    <v-list dense>
      <Card :isSubTitle="false">
        <template v-slot:title>
          <p class="text-sm-body-1">Select the port forwarding type:</p>
          <v-btn-toggle
              :value="state.session.direction"
              dense
              class="rounded-lg"
              mandatory
          >
            <v-btn
                width="100"
                :value="Defs.STR_LOCAL"
                @click="onClickDirection(Defs.STR_LOCAL)"
            >Local</v-btn>

            <v-btn
                width="100"
                :value="Defs.STR_REMOTE"
                @click="onClickDirection(Defs.STR_REMOTE)"
            >Remote</v-btn>

            <v-btn
                width="100"
                :value="Defs.STR_SOCKSV5"
                @click="onClickDirection(Defs.STR_SOCKSV5)"
            >Socksv5</v-btn>
          </v-btn-toggle>
        </template>

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

          <v-container>
            <v-row align="center" dense>
              <v-col cols="12" align="left">
                <strong v-show="isLocal()">Local forwarding lets you access a remote server's listening port as though it were local.</strong>
                <strong v-show="isRemote()">Remote forwarding opens a port on the remote machine and forwards connections to the local (current) host.</strong>
                <strong v-show="isSocksv5()">Dynamic port forwarding turns {{ Defs.APP_TITLE }} into a SOCKSsv5 proxy server. SOCKsv5 proxy server is a protocol to request any connection via a remote host.</strong>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:actions>
          <v-container>
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
  name: "Direction",
  components: {
    Card
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5'])
  },
  methods: {
    ...mapActions('PortForwarding', ['setSessionValue', 'moveNextButton']),
    close () {
      this.$emit('msgClose')
    },
    onClickDirection (target) {
      this.setSessionValue(target)
    },
    onClickContinue () {
      this.moveNextButton()
    }
  }
}
</script>

<style scoped>

</style>
