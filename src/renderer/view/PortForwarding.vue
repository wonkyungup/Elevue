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
          v-on:msgClickEditButton="onClickEditButton"
          v-on:msgClickDeleteButton="onClickDeleteButton"
      />
    </template>

    <template v-slot:actions>
      <NewSession ref="NewSession" />
      <EditSession ref="EditSession" />
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
  EditSession,
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
    EditSession,
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
    onClickEditButton () {
      this.$refs['EditSession'].open()
    },
    onClickDeleteButton () {
      this.$refs['DeleteSession'].open()
    }
  }
}
</script>

<style scoped>

</style>
