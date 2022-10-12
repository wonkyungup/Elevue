<template>
    <v-container fluid>
    <v-row
        align="center"
        justify="center"
        dense
    >
      <v-col
          align="center"
          cols="12"
      >
        <h1>{{ list }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { mapState } from 'vuex'

export default {
  name: "SessionBody",
  data: () => {
    return {
      list: []
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' })
  },
  watch: {
    state: {
      handler () {
        if (this.state.arrTunneling.length > 0) {
          this.list = this.state.arrTunneling
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
  