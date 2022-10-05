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
          <v-icon x-large disabled>{{ server }}</v-icon>
        </v-col>
        <v-col cols="2" align="center">
          <v-progress-linear
              color="primary"
              rounded
              height="6"
              value="0"
          ></v-progress-linear>
        </v-col>
        <v-col cols="2" align="center">
          <v-icon x-large disabled>{{ cloud }}</v-icon>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row align="center" dense>
        <v-col cols="12" align="left">
          <strong>This port will be open on the local (current) device. And it will receive the traffic.</strong>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Defs from '@/assets/js/constants'

export default {
  name: "Socksv5",
  data: () => {
    return {
      account: Defs.ICON_ACCOUNT,
      server: Defs.ICON_SERVER,
      cloud: Defs.ICON_CLOUD
    }
  }
}
</script>

<style scoped>

</style>
