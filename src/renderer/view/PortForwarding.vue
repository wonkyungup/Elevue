<template>
  <Card
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
import {mapActions, mapGetters, mapState} from 'vuex'
import { Card } from '@/components/Layout'
import {
  Title,
  WelcomeBody,
  SessionBody,
  SessionDrawer
} from '@/components/PortForwarding'
import DB from '../model'

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
    ...mapState({ Defs: 'Constants', state: 'MasterPassword' }),
    ...mapGetters('PortForwarding', ['isWelcomePage'])
  },
  mounted() {
    const db = new DB()
    db.getPortForwardingTableItems().then(rows => {
      if (rows.length > 0) {
        this.setDBArrTunneling(rows)
      }
    })
  },
  methods: {
    ...mapActions('PortForwarding', ['setDBArrTunneling']),
    onClickNewButton () {
      this.$refs.SessionDrawer.open()
    }
  }
}
</script>

<style scoped>

</style>
