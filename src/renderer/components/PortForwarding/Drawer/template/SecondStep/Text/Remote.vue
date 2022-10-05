<template>
    <div>
      <v-container>
        <v-row align="center" dense>
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
            <v-icon x-large>{{ server }}</v-icon>
          </v-col>
          <v-col cols="2" align="center">
            <v-progress-linear
                color="primary"
                rounded
                height="6"
                indeterminate
            ></v-progress-linear>
          </v-col>
          <v-col cols="2" align="center">
            <v-icon x-large disabled>{{ account }}</v-icon>
          </v-col>
        </v-row>
      </v-container>
  
      <v-container>
        <v-row align="center" dense>
          <v-col cols="12" align="left">
            <strong>Select a host where the port will be open. The traffic from this port will be forwarded to the destination host.</strong>
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
  