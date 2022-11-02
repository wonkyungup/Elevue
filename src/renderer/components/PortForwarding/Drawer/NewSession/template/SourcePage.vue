<template>
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
              <strong v-show="isLocal()">This port will be open on the local (current) machine to forward traffic to the remote host.</strong>
              <strong v-show="isRemote()">We will forward traffic from specified port and interface address of the host.</strong>
              <strong v-show="isSocksv5()">This port will be open on the local (current) device. And it will receive the traffic.</strong>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:actions>
        <v-container>
          <v-row align="center" dense>
            <v-col cols="10">
              <v-text-field
                  ref="hostname"
                  v-model="hostname"
                  placeholder="Binding Address"
                  outlined
                  dense
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                  ref="port"
                  v-model="port"
                  placeholder="Port"
                  outlined
                  dense
                  type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" dense>
            <v-col cols="10">
              <v-btn
                  block
                  color="primary"
                  @click="onClickContinue"
                  :disabled="(!hostname || !port)"
              >Continue</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </Card>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Card } from '@/components/Layout'

export default {
  name: "SourcePage",
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
        const hostname = this.hostname
        const port = this.port

        this.$nextTick(() => {
          if (!hostname || hostname.length === 0) {
            this.$refs['hostname'].focus()
          }

          if (!port  || port < 0) {
            this.$refs['port'].focus()
          }
        })
      },
      immediate: true,
      deep: false
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5', 'isDrawerDirection'])
  },
  methods: {
    ...mapActions('PortForwarding', ['setSessionValue', 'moveNextButton']),
    onClickContinue () {
      const hostname = this.hostname
      const port = this.port

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
