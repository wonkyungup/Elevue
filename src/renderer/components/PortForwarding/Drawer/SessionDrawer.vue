<template>
  <v-navigation-drawer
      v-model="drawer"
      width="450"
      right
      absolute
      temporary
  >

  <directTitle
      v-show="state.isDirection"
      v-on:msgClose="close"
  ></directTitle>
  <stageUpperTitle
      v-show="state.isStageUpper"
      v-on:msgClose="close"
  ></stageUpperTitle>

  <v-divider></v-divider>

  <directContext
      v-show="state.isDirection"
  ></directContext>
  <stageUpperContext
      v-show="state.isStageUpper"
  ></stageUpperContext>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
    directTitle,
    directContext,
    stageUpperTitle,
    stageUpperContext
} from './template'

export default {
  name: "SessionDrawer",
  components: {
    directTitle,
    directContext,
    stageUpperTitle,
    stageUpperContext
  },
  data: () => {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState({ state: 'PortForwarding' })
  },
  watch: {
    state: {
      handler () {
        console.log(this.state)
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['clearSessionValue']),
    open () {
      this.drawer = true
      this.clearSessionValue()
    },
    close () {
      this.drawer = false
    }
  }
}
</script>
