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
                v-model="address"
                placeholder="Binding Address"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
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
import { TextLocal, TextRemote, TextSocksv5 } from './Text'
import { Card } from '@/components/Layout'

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
      address: '',
      port: null
    }
  },
  watch: {
    'state.isDirection': {
      handler () {
        this.address = ''
        this.port = ''
      },
      immediate: false,
      deep: true
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5'])
  },
  methods: {
    ...mapActions('PortForwarding', ['setContinueFirstStep', 'setSessionFirstStep']),
    onClickContinue () {
      const address = this.address
      const port = this.port

      if (address && port) {
        this.setSessionFirstStep({ address, port })
        this.setContinueFirstStep()
      }
    }
  }
}
</script>

<style scoped>

</style>
