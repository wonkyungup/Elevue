<template>
  <div>
    <v-container>
      <v-row align="center" dense>

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
          <strong>Local forwarding lets you access a remote server's listening port as though it were local.</strong>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Defs from '@/assets/js/constants'

export default {
  name: "Local",
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
