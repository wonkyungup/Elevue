<template>
  <v-toolbar height="100">
    <v-container fluid>
      <v-row
          align="center"
          justify="center"
          dense
          class="pt-5"
      >
        <v-col align="left" cols="12">
          <v-btn outlined small @click="onClickNewButton">
            <v-icon left>{{ plus }}</v-icon>
            <strong>{{ content }}</strong>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
import Defs from '@/assets/js/constants'

export default {
  name: "Header",
  data: () => {
    return {
      plus: Defs.ICON_PLUS,
      content: 'NEW'
    }
  },
  methods: {
    onClickNewButton() {
      this.$emit('msgClickNewButton')
    }
  }
}
</script>

<style scoped>

</style>
