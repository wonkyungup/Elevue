<template>
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
            :value="local"
            @click="onClickDirection(local)"
           >Local</v-btn>

          <v-btn
            width="100"
            :value="remote"
            @click="onClickDirection(remote)"
          >Remote</v-btn>

          <v-btn
           width="100"
           :value="socksv5"
           @click="onClickDirection(socksv5)"
           >Socksv5</v-btn>
        </v-btn-toggle>
      </template>

      <template v-slot:text>
        <Local v-show="isLocal()"></Local>
        <Remote v-show="isRemote()"></Remote>
        <Socksv5 v-show="isSocksv5()"></Socksv5>
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
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Local, Remote, Socksv5 } from './Text'
import { Card } from '@/components/Layout'
import Defs from '@/assets/js/constants'

export default {
  name: "Content",
  components: { Card, Local, Remote, Socksv5 },
  data: () => {
    return {
      local: Defs.STR_LOCAL,
      remote: Defs.STR_REMOTE,
      socksv5: Defs.STR_SOCKSV5
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5'])
  },
  methods: {
    ...mapActions('PortForwarding', ['setSessionDirection', 'setContinueDirection']),
    onClickDirection (target) {
      this.setSessionDirection(target)
    },
    onClickContinue () {
      this.setContinueDirection()
    }
  }
}
</script>

<style scoped>

</style>
