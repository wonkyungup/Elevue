<template>
  <Card
      class="main-port-forwarding"
      :titleClass="'pa-0'"
      :textClass="'pa-0'"
      :isSubTitle="false"
  >
    <template v-slot:title>
      <Title
          v-on:msgClickNewButton="onClickNewButton"
      ></Title>
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
import { mapGetters } from 'vuex'
import { Card } from '@/components/Layout'
import {
  Title,
  WelcomeBody,
  SessionBody,
  SessionDrawer
} from '@/components/PortForwarding'

export default {
  name: "Main",
  components: {
    Card,
    Title,
    WelcomeBody,
    SessionBody,
    SessionDrawer
  },
  computed: {
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
