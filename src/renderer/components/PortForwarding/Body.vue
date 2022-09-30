<template>
  <v-container fluid>
    <v-row
        align="center"
        justify="center"
        dense
    >
      <v-col
          align="center"
          cols="12"
      >
        <v-card
            height="50"
            elevation="0"
        />

        <v-row
            align="center"
            justify="center"
            dense
        >
          <v-col
              cols="2"
              align="right"
          >
            <v-icon x-large>{{ account }}</v-icon>
          </v-col>
          <v-col
              cols="2"
              align="left"
          >
            <v-icon x-large>{{ arrowRightBold }}</v-icon>
            <v-icon x-large>{{ ethernet }}</v-icon>
          </v-col>
          <v-col
              cols="2"
              align="left"
          >
            <v-icon x-large>{{ arrowRightBold }}</v-icon>
            <v-icon x-large>{{ server }}</v-icon>
          </v-col>
          <v-col
              cols="2"
              align="left"
          >
            <v-icon x-large>{{ arrowRightBold }}</v-icon>
            <v-icon x-large>{{ ethernet }}</v-icon>
          </v-col>
          <v-col
              cols="2"
              align="left"
          >
            <v-icon x-large>{{ accountHeart }}</v-icon>
          </v-col>
        </v-row>

        <v-card
            height="50"
            elevation="0"
        />

        <strong>{{ enText }}</strong>
        <br />
        <strong>{{ koText }}</strong>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Con from '@/assets/js/constants'

export default {
  name: "Body",
  data: () => {
    return {
      account: Con.ICON_ACCOUNT,
      accountHeart: Con.ICON_ACCOUNT_HEART,
      server: Con.ICON_SERVER,
      plus: Con.ICON_PLUS,
      arrowRightBold: Con.ICON_ARROW_RIGHT_BOLD,
      ethernet: Con.ICON_ETHERNET,
      enText: 'Redirect communication requests with port forwarding rules.',
      koText: '포트 전달 규칙으로 통신 요청 리디렉션.'
    }
  }
}
</script>

<style scoped>

</style>
