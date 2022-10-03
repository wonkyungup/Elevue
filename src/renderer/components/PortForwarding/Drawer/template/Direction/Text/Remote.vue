<template>
  <div>
    <v-container>
      <v-row align="center" dense>

        <v-col cols="2" align="center">
          <v-icon x-large>{{ server }}</v-icon>
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
          <v-icon x-large>{{ account }}</v-icon>
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
          <v-icon x-large>{{ server }}</v-icon>
        </v-col>

      </v-row>
    </v-container>

    <v-container>
      <v-row align="center" dense>
        <v-col cols="12" align="left">
          <strong>Remote forwarding opens a port on the remote machine and forwards connections to the local (current) host.</strong>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Defs from '@/assets/js/constants'

export default {
  name: "Remote",
  data: () => {
    return {
      account: Defs.ICON_ACCOUNT,
      server: Defs.ICON_SERVER
    }
  }
}
</script>

<style scoped>

</style>
