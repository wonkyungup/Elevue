<template>
  <BrowserTitle
      :align="'center'"
  >
    <template v-slot:title>
      <v-row dense>
        <v-col cols="4">
          <v-img
              src="static/App_logo.png"
              width="128"
              height="64"
          />
        </v-col>
        <v-col cols="4">
          <h1 class="mt-5">{{ Defs.APP_TITLE }}</h1>
        </v-col>
        <v-col cols="4">
          <v-img
              src="static/App_logo.png"
              width="128"
              height="64"
          />
        </v-col>
      </v-row>
    </template>
  </BrowserTitle>
</template>

<script>
import { mapState } from 'vuex'
import { BrowserTitle } from '../Layout'

export default {
  name: "Title",
  components: {
    BrowserTitle
  },
  computed: {
    ...mapState({ Defs: 'Constants' }),
  }
}
</script>

<style scoped>

</style>
