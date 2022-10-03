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
          <v-btn width="100" :value="local">Local</v-btn>
          <v-btn width="100" :value="remote">Remote</v-btn>
          <v-btn width="100" :value="socksv5">Socksv5</v-btn>
        </v-btn-toggle>
      </template>

      <template v-slot:text>
        <Local v-show="direction === local"></Local>
        <Remote v-show="direction === remote"></Remote>
        <Socksv5 v-show="direction === socksv5"></Socksv5>
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
import { Card } from '@/components/Layout'
import { mapActions } from 'vuex'
import { Local, Remote, Socksv5 } from './Text'
import Defs from '@/assets/js/constants'

export default {
  name: "Content",
  components: { Card, Local, Remote, Socksv5 },
  data: () => {
    return {
      local: Defs.STR_LOCAL,
      remote: Defs.STR_REMOTE,
      socksv5: Defs.STR_SOCKSV5,
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
