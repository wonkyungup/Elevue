<template>
  <v-toolbar height="100">
    <v-container fluid>
      <v-row
          align="center"
          justify="center"
          dense
          class="pt-5"
      >
        <v-col
            align="left"
            :cols="12"
        >
          <v-btn
              outlined
              small
              @click="onClickNewButton"
          >
            <v-icon left>{{ iconPlus }}</v-icon>
            <strong>{{ titlePlus }}</strong>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
import Con from '@/assets/js/constants'

export default {
  name: "Header",
  data: () => {
    return {
      iconPlus: Con.ICON_PLUS,
      titlePlus: 'NEW'
    }
  },
  methods: {
    onClickNewButton() {
      console.log('onClickNewButton')
    }
  }
}
</script>

<style scoped>

</style>
