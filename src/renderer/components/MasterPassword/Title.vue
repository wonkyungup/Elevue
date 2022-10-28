<template>
  <BrowserTitle
      :align="'center'"
  >
    <template v-slot:title>
      <h1>{{ Defs.APP_TITLE }}</h1>
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
