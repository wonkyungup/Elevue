<template>
    <v-list-item>
      <v-btn icon color="primary" @click="onClickBack">
        <v-icon>{{ arrowLeft }}</v-icon>
      </v-btn>
  
      <v-list-item-content>
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
  import { mapGetters, mapActions } from 'vuex'
  import Defs from '@/assets/js/constants'
  
  export default {
    name: "Title",
    data: () => {
      return {
        arrowCollapseRight: Defs.ICON_ARROW_COLLAPSE_RIGHT,
        arrowLeft: Defs.ICON_ARROW_LEFT,
      }
    },
    computed: {
      ...mapGetters('PortForwarding', ['getDirectionTitle'])
    },
    methods: {
      ...mapActions('PortForwarding', ['backSecondStep']),
      close () {
        this.$emit('msgClose')
      },
      onClickBack () {
        this.backSecondStep()
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  