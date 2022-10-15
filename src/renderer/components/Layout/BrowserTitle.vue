<template>
  <v-toolbar height="100">
    <v-container fluid>
      <v-row
          align="center"
          justify="center"
          dense
          class="pt-5"
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
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style scoped>

</style>
