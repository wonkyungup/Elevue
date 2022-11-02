<template>
  <v-app-bar height="64" fixed hide-on-scroll class="pa-0">
    <v-list-item class="pa-0">
      <v-btn
          v-show="!isDrawerDirection()"
          icon
          color="primary"
          @click="onClickBack"
      >
        <v-icon>{{ Defs.ICON_ARROW_LEFT }}</v-icon>
      </v-btn>

      <v-list-item-content class="pa-0">
        <v-list-item-title class="text-h6 font-weight-bold">
          {{ isDrawerDirection() ? 'New Port Forwarding' : getDirectionTitle() + ' Port Forwarding' }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar class="pa-0">
        <v-btn icon @click="close">
          <v-icon>{{ Defs.ICON_ARROW_COLLAPSE_RIGHT }}</v-icon>
        </v-btn>
      </v-list-item-avatar>
    </v-list-item>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "Title",
  computed: {
    ...mapState({ Defs: 'Constants' }),
    ...mapGetters('PortForwarding', ['getDirectionTitle', 'isDrawerDirection'])
  },
  methods:{
    ...mapActions('PortForwarding', ['moveBackButton']),
    close () {
      this.$emit('msgClose')
    },
    onClickBack () {
      this.moveBackButton()
    }
  }
}
</script>

<style scoped>

</style>