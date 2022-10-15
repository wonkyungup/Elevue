<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center" dense>
      <v-col align="center" cols="12">
        <slot name="content"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Container"
}
</script>

<style scoped>

</style>
