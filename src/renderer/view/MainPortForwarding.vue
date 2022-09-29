<template>
  <defaultLayout class="main-port-forwarding">
    <v-toolbar>
      <v-container fluid>
        <v-row
            class="pt-5"
            align="center"
            justify="center"
            dense
        >
          <v-col cols="6" align="left">
            <v-btn outlined small>
              <v-icon left>mdi-plus</v-icon>
              <strong>NEW</strong>
            </v-btn>
          </v-col>
          <v-col cols="6" align="right">
<!--            <v-icon>mdi-magnify</v-icon>-->
<!--            <strong>serach</strong>-->
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </defaultLayout>
</template>

<script>
import { defaultLayout } from '@/components/common'

export default {
  name: "MainPortForwarding",
  components: {
    defaultLayout
  }
}
</script>

<style scoped>

</style>
