<template>
  <BrowserTitle
      :align="'center'"
  >
    <template v-slot:title>
      <h1>Master Password</h1>
    </template>
  </BrowserTitle>
</template>

<script>
import { BrowserTitle } from '../Layout'

export default {
  name: "Title",
  components: {
    BrowserTitle
  }
}
</script>

<style scoped>

</style>
