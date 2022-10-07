<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'Evue',
    mounted() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches
      })
    }
  }
</script>

<style>
  /* CSS */
</style>
