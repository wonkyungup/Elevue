<template>
  <Card
      :titleClass="'pa-0'"
      :textClass="'pa-0'"
      :isSubTitle="false"
      :isActions="false"
  >
    <template v-slot:title>
      <Title />
    </template>

    <template v-slot:text>
      <Content
          v-on:msgMasterPassword="onMasterPassword"
      />
    </template>
  </Card>
</template>

<script>
import { Card } from '@/components/Layout'
import { Title, Content } from '@/components/MasterPassword'
import { ipcRenderer } from 'electron'
import * as remote from '@electron/remote'

export default {
  name: "MasterPassword",
  components: {
    Card,
    Title,
    Content
  },
  methods: {
    onMasterPassword () {
      ipcRenderer.send(remote.getGlobal('MSG_MASTER_PASSWORD'))
    }
  }
}
</script>

<style scoped>

</style>
