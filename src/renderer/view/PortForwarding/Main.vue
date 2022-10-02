<template>
  <Card
      class="main-port-forwarding"
      :titleClass="'pa-0'"
      :textClass="'pa-0'"
      :isSubTitle="false"
  >
    <template v-slot:title>
      <Header
          v-on:msgClickNewButton="onClickNewButton"
      ></Header>
    </template>

    <template v-slot:text>
      <WelcomeBody v-if="isWelcomePage()" />
      <SessionBody v-else />
    </template>

    <template v-slot:actions>
      <SessionDrawer
          ref="SessionDrawer"
          v-on:msgClickDirectionContinue="onClickDirectionContinue"
      ></SessionDrawer>
    </template>
  </Card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Card } from '@/components/layout'
import {
  Header,
  WelcomeBody,
  SessionBody,
  SessionDrawer
} from '@/components/PortForwarding'

export default {
  name: "Main",
  components: {
    Card,
    Header,
    WelcomeBody,
    SessionBody,
    SessionDrawer
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    ...mapGetters('PortForwarding', ['isWelcomePage'])
  },
  watch: {
    state: {
      handler () {
        console.log(this.state.session)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onClickNewButton () {
      this.$refs.SessionDrawer.open()
    },
    onClickDirectionContinue () {
      console.log('onClickDirectionContinue')
    }
  }
}
</script>

<style scoped>

</style>
