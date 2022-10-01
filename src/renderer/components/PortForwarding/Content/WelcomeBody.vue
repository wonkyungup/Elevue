<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center" dense>
      <v-col align="center" cols="12">
        <v-row
            align="center"
            justify="center"
            dense
            class="pb-8"
        >
          <v-col cols="2" align="right">
            <v-icon x-large>{{ account }}</v-icon>
          </v-col>

          <v-col cols="2" align="left">
            <v-icon x-large>{{ arrowRightBold }}</v-icon>
            <v-icon x-large>{{ ethernet }}</v-icon>
          </v-col>

          <v-col cols="2" align="left">
            <v-icon x-large>{{ arrowRightBold }}</v-icon>
            <v-icon x-large>{{ server }}</v-icon>
          </v-col>

          <v-col cols="2" align="left">
            <v-icon x-large>{{ arrowRightBold }}</v-icon>
            <v-icon x-large>{{ ethernet }}</v-icon>
          </v-col>

          <v-col cols="2" align="left">
            <v-icon x-large>{{ accountHeart }}</v-icon>
          </v-col>
        </v-row>

        <strong>Redirect communication requests with port forwarding rules.</strong>
        <br/>
        <strong>포트 전달 규칙으로 통신 요청 리디렉션.</strong>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Defs from '@/assets/js/constants'

export default {
  name: "WelcomeBody",
  data: () => {
    return {
      account: Defs.ICON_ACCOUNT,
      accountHeart: Defs.ICON_ACCOUNT_HEART,
      server: Defs.ICON_SERVER,
      plus: Defs.ICON_PLUS,
      arrowRightBold: Defs.ICON_ARROW_RIGHT_BOLD,
      ethernet: Defs.ICON_ETHERNET
    }
  }
}
</script>

<style scoped>

</style>
