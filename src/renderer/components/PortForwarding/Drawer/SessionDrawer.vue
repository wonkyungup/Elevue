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
  <step1Title
      v-show="state.isStageUpper"
      v-on:msgClose="close"
  ></step1Title>

  <v-divider></v-divider>

  <directContext
      v-show="state.isDirection"
  ></directContext>
  <step1Context
      v-show="state.isStageUpper"
  ></step1Context>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
    directTitle,
    directContext,
    step1Title,
    step1Context
} from './template'

export default {
  name: "SessionDrawer",
  components: {
    directTitle,
    directContext,
    step1Title,
    step1Context
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
