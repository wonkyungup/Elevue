<template>
  <div>
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
        <SessionDrawer ref="SessionDrawer"></SessionDrawer>
      </template>
    </Card>
  <div>

  </div>
    <ModalDeleteCard ref="ModalDeleteCard" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Card } from '@/components/Layout'
import {
  Title,
  WelcomeBody,
  SessionBody,
  SessionDrawer
} from '@/components/PortForwarding'
import DB from '../model'
import { ModalDeleteCard } from '@/components/Modal'

export default {
  name: "Main",
  components: {
    Card,
    Title,
    WelcomeBody,
    SessionBody,
    SessionDrawer,
    ModalDeleteCard
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
      this.$refs['SessionDrawer'].open()
    },
    onClickDeleteButton () {
      this.$refs['ModalDeleteCard'].open()
    }
  }
}
</script>

<style scoped>

</style>
