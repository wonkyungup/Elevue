<template>
  <BrowserTitle
      :height="120"
      :align="'center'"
      :color="isDarkMode($vuetify) ? '#212121' : '#E0E0E0'"
  >
    <template v-slot:title>
      <v-img
          :src="isDarkMode($vuetify) ? 'static/Title-dark.png' : 'static/Title-light.png'"
          width="220"
          height="80"
      />
    </template>
  </BrowserTitle>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { BrowserTitle } from '../Layout'

export default {
  name: "Title",
  components: {
    BrowserTitle
  },
  computed: {
    ...mapState({ Defs: 'Constants' }),
    ...mapGetters('Vuetify', ['isDarkMode'])
  }
}
</script>

<style scoped>

</style>
