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
  <secondStepTitle
    v-show="state.isSecondStep"
    v-on:msgClose="close"
  ></secondStepTitle>

  <v-divider></v-divider>

  <directContext
     v-show="state.isDirection"
  ></directContext>
  <firstStepContext
    v-show="state.isFirstStep"
  ></firstStepContext>
  <secondStepContext
    v-show="state.isSecondStep"
  ></secondStepContext>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
    directTitle,
    directContext,
    firstStepTitle,
    firstStepContext,
    secondStepTitle,
    secondStepContext
} from './template'

export default {
  name: "SessionDrawer",
  components: {
    directTitle,
    directContext,
    firstStepTitle,
    firstStepContext,
    secondStepTitle,
    secondStepContext
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
