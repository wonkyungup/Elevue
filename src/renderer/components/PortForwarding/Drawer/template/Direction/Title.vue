<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="text-h6 font-weight-bold">
        New Port Forwarding
      </v-list-item-title>
    </v-list-item-content>

    <v-list-item-avatar>
      <v-btn icon @click="close">
        <v-icon>{{ arrowCollapseRight }}</v-icon>
      </v-btn>
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
import Defs from '@/assets/js/constants'

export default {
  name: "Title",
  data: () => {
    return {
      arrowCollapseRight: Defs.ICON_ARROW_COLLAPSE_RIGHT
    }
  },
  methods: {
    close () {
      this.$emit('msgClose')
    }
  }
}
</script>

<style scoped>

</style>
