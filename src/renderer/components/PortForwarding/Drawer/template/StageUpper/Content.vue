<template>
  <v-list dense>
    <Card :isSubTitle="false">
      <template v-slot:title>
        <p v-if="isRemote()" class="text-sm-body-1">Select the remote host:</p>
        <p v-else class="text-sm-body-1">Set the local port and binding address:</p>
      </template>

      <template v-slot:text>
        <TextLocal v-show="isLocal()"></TextLocal>
        <TextRemote v-show="isRemote()"></TextRemote>
        <TextSocksv5 v-show="isSocksv5()"></TextSocksv5>
      </template>

      <template v-slot:actions>
        <v-container>
          <v-row align="center" dense>
            <v-col cols="10">
              <v-text-field
                  autofocus
                  v-model="hostname"
                  placeholder="Binding Hostname"
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
              <v-btn block color="primary" @click="onClickContinue">Continue</v-btn>
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
import { TextLocal, TextRemote, TextSocksv5 } from './Text'
import Defs from '@/assets/js/constants'

export default {
  name: "Content",
  components: {
    Card,
    TextLocal,
    TextRemote,
    TextSocksv5
  },
  data: () => {
    return {
      hostname: '',
      port: ''
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5'])
  },
  methods: {
    ...mapActions('PortForwarding', ['setStageUpper']),
    onClickContinue () {
      const _host = this.hostname
      const _port = this.port
      if (_host.length > 0 && _port > 0) {
        this.setStageUpper({ _host, _port })
      }

      this.$emit('msgClickContinue', Defs.STR_STAGE_UPPER)
    }
  }
}
</script>

<style scoped>

</style>
