<template>
  <Card
      class="main-port-forwarding"
      :titleClass="'pa-0'"
      :textClass="'pa-0'"
      :isSubTitle="false"
      :isActions="false"
  >
    <template v-slot:title>
      <Header />
    </template>

    <template v-slot:text>
      <Body />
    </template>
  </Card>
</template>

<script>
import { Card } from '@/components/layout'
import { Header, Body } from '@/components/PortForwarding'

export default {
  name: "MainPortForwarding",
  components: { Card, Header, Body }
}
</script>

<style scoped>

</style>
