<template>
  <v-list-item>
    <v-btn
        icon
        color="primary"
        @click="onClickBack"
    >
      <v-icon>{{ back }}</v-icon>
    </v-btn>

    <v-list-item-content class="pt-4">
      <v-list-item-title class="text-h6 font-weight-bold">
        {{ getDirectionTitle() }} Port Forwarding
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
import { mapGetters } from 'vuex'
import Defs from '@/assets/js/constants'

export default {
  name: "Title",
  data: () => {
    return {
      arrowCollapseRight: Defs.ICON_ARROW_COLLAPSE_RIGHT,
      back: Defs.ICON_ARROW_LEFT,
    }
  },
  computed: {
    ...mapGetters('PortForwarding', ['getDirectionTitle'])
  },
  methods: {
    close () {
      this.$emit('msgClickClose')
    },
    onClickBack () {
      this.$emit('msgClickBack', Defs.STR_STAGE_UPPER)
    }
  }
}
</script>

<style scoped>

</style>
