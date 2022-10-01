<template>
    <v-navigation-drawer
        v-model="drawer"
        width="450"
        right
        absolute
        temporary
    >
    <v-list-item>
        <v-list-item-content>
        <v-list-item-title>
            <strong>New Port Forwarding</strong>
        </v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
            <v-btn icon @click="close">
                <v-icon>{{ arrowCollapseRight }}</v-icon>
            </v-btn>
        </v-list-item-avatar>
    </v-list-item>

    <v-divider></v-divider>

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
                  <v-col cols="12">
                    <v-btn
                        block
                        color="primary"
                        @click="onClickDirectionContinue"
                    >Continue</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </template>
        </Card>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import Defs from '@/assets/js/constants'
import { Card } from '@/components/layout'

export default {
    name: "SessionDrawer",
    components: {
        Card
    },
    data: () => {
        return {
          arrowCollapseRight: Defs.ICON_ARROW_COLLAPSE_RIGHT,
          account: Defs.ICON_ACCOUNT,
          arrowRightBold: Defs.ICON_ARROW_RIGHT_BOLD,
          ethernet: Defs.ICON_ETHERNET,
          drawer: false,
          items: [],
          direction: '',
          local: Defs.DIRECTION_LOCAL,
          remote: Defs.DIRECTION_REMOTE,
          socksv5: Defs.DIRECTION_SOCKSV5
        }
    },
    methods: {
      ...mapActions('PortForwarding', ['setDirection']),
      open () {
        this.drawer = true
        this.direction = ''
      },
      close () {
        this.drawer = false
      },
      onClickDirectionContinue () {
        this.setDirection(this.direction)
      }
    }
}
</script>
