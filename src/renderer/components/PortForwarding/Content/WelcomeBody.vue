<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center" dense>
      <v-col align="center" cols="12">
        <v-img
           :src="$vuetify.theme.dark ? 'static/PortForwarding-dark.png' : 'static/PortForwarding-light.png'"
           max-width="400"
           max-height="400"
        ></v-img>
        <br/>
        <strong>Redirect communication requests with port forwarding rules.</strong>
        <br/>
        <strong>포트 전달 규칙으로 통신 요청 리디렉션.</strong>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "WelcomeBody"
}
</script>

<style scoped>
.row {
  height: calc(100vh - 100px);
}
</style>
