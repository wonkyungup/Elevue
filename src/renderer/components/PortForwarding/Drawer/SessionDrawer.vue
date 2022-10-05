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
  <firstStepTitle
      v-show="state.isFirstStep"
      v-on:msgClose="close"
  ></firstStepTitle>

  <v-divider></v-divider>

  <directContext
      v-show="state.isDirection"
  ></directContext>
  <firstStepContext
      v-show="state.isFirstStep"
  ></firstStepContext>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
    directTitle,
    directContext,
    firstStepTitle,
    firstStepContext
} from './template'

export default {
  name: "SessionDrawer",
  components: {
    directTitle,
    directContext,
    firstStepTitle,
    firstStepContext
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
