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
      <SessionDrawer ref="SessionDrawer"></SessionDrawer>
    </template>
  </Card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Card } from '@/components/Layout'
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
  methods: {
    onClickNewButton () {
      this.$refs.SessionDrawer.open()
    }
  }
}
</script>

<style scoped>

</style>
