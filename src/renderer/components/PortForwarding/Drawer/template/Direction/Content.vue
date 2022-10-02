<template>
  <v-list dense>
    <Card :isSubTitle="false">
      <template v-slot:title>
        <p class="text-sm-body-1">Select the port forwarding type:</p>
        <v-btn-toggle
            v-model="direction"
            dense
            class="rounded-lg"
            mandatory
        >
          <v-btn width="100" :value="local.TARGET">Local</v-btn>
          <v-btn width="100" :value="remote.TARGET">Remote</v-btn>
          <v-btn width="100" :value="socksv5.TARGET">Socksv5</v-btn>
        </v-btn-toggle>
      </template>

      <template v-slot:text>
        <v-container>
          <v-row align="center" dense>
            <v-col cols="2" align="center">
              <v-icon x-large>{{ account }}</v-icon>
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
              <v-icon x-large>{{ ethernet }}</v-icon>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row align="center" dense>
            <v-col cols="12" align="left">
              <strong v-show="direction === local.TARGET">{{ local.CONTENT }}</strong>
              <strong v-show="direction === remote.TARGET">{{ remote.CONTENT }}</strong>
              <strong v-show="direction === socksv5.TARGET">{{ socksv5.CONTENT }}</strong>
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
</template>

<script>
import { mapActions } from 'vuex'
import { Card } from '@/components/layout'
import Defs from '@/assets/js/constants'

export default {
  name: "Content",
  components: { Card },
  data: () => {
    return {
      account: Defs.ICON_ACCOUNT,
      ethernet: Defs.ICON_ETHERNET,
      local: Defs.DIRECTION_LOCAL,
      remote: Defs.DIRECTION_REMOTE,
      socksv5: Defs.DIRECTION_SOCKSV5,
      direction: ''
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['setDirection']),
    onClickContinue () {
      const _direction = this.direction
      if (_direction.length > 0) {
        this.setDirection(_direction)
      }

      this.$emit('msgClickContinue', Defs.STR_DIRECTION)
    }
  }
}
</script>

<style scoped>

</style>
