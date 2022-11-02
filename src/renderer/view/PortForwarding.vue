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
      <SessionBody
          v-else
          v-on:msgClickDeleteButton="onClickDeleteButton"
      />
    </template>

    <template v-slot:actions>
      <NewSession ref="NewSession" />
      <DeleteSession ref="DeleteSession" />
    </template>
  </Card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Card } from '@/components/Layout'
import {
  Title,
  WelcomeBody,
  SessionBody,
  NewSession,
  DeleteSession
} from '@/components/PortForwarding'
import DB from '../model'

export default {
  name: "Main",
  components: {
    Card,
    Title,
    WelcomeBody,
    SessionBody,
    NewSession,
    DeleteSession
  },
  computed: {
    ...mapState({ Defs: 'Constants' }),
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
      this.$refs['NewSession'].open()
    },
    onClickDeleteButton () {
      this.$refs['DeleteSession'].open()
    }
  }
}
</script>

<style scoped>

</style>
