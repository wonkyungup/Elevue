<template>
  <v-list dense>
    <Card :isSubTitle="false">
      <template v-slot:title>
        <p
            v-if="isDirectionRemote()"
            class="text-sm-body-1"
        >Select the remote host:</p>
        <p
            v-else
            class="text-sm-body-1"
        >Set the local port and binding address:</p>
      </template>

      <template v-slot:text>
        <v-container>
          <v-row align="center" dense>
            <v-col cols="2" align="center">
              <v-icon v-if="!isDirectionRemote()" x-large>{{ ethernet }}</v-icon>
              <v-icon v-else x-large>{{ server }}</v-icon>
            </v-col>
            <v-col cols="4" align="center">
              <v-progress-linear
                  color="primary"
                  indeterminate
                  rounded
                  height="10"
              ></v-progress-linear>
            </v-col>
            <v-col cols="2" align="center">
              <v-icon v-if="!isDirectionRemote()" x-large>{{ server }}</v-icon>
              <v-icon v-else x-large>{{ ethernet }}</v-icon>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row align="center" dense>
            <v-col cols="12" align="left">
              <strong v-if="state.session.direction === local.TARGET"> {{ local.GUIDE }} </strong>
              <strong v-else-if="state.session.direction === remote.TARGET"> {{ remote.GUIDE }} </strong>
              <strong v-else-if="state.session.direction === socksv5.TARGET"> {{ socksv5.GUIDE }} </strong>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:actions>
        <v-container>
          <v-row align="center" dense>
            <v-col cols="10">
              <v-text-field
                  autofocus
                  v-model="hostname"
                  placeholder="Source Hostname"
                  outlined
                  dense
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                  v-model="port"
                  placeholder="Source Port"
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
import { Card } from '@/components/layout'
import Defs from '@/assets/js/constants'

export default {
  name: "Content",
  components: { Card },
  data: () => {
    return {
      ethernet: Defs.ICON_ETHERNET,
      server: Defs.ICON_SERVER,
      local: Defs.DIRECTION_LOCAL,
      remote: Defs.DIRECTION_REMOTE,
      socksv5: Defs.DIRECTION_SOCKSV5,
      hostname: 'localhost',
      port: '30001'
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isDirectionRemote'])
  },
  methods: {
    ...mapActions('PortForwarding', ['setStep1']),
    onClickContinue () {
      const _host = this.hostname
      const _port = this.port

      if (_host.length > 0 && _port > 0) {
        this.setStep1({ _host, _port })
      }
      this.$emit('msgClickContinue', Defs.STR_STEP_1)
    }
  }
}
</script>

<style scoped>

</style>
