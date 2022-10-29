<template>
  <v-toolbar
      :height="height"
      :color="color"
  >
    <v-container fluid>
      <v-row
          align="center"
          justify="center"
          dense
      >
        <v-col :align="align" cols="12">
          <slot name="title"></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "Title",
  props: {
    color: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 100
    },
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style scoped>

</style>
