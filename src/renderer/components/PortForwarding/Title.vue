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
          <v-btn outlined @click="onClickNewButton">
            <v-icon left>{{ Defs.ICON_PLUS }}</v-icon>
              <strong>NEW</strong>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Header",
  computed: {
    ...mapState({ Defs: 'Constants' })
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
