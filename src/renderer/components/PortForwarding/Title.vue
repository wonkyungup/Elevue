<template>
  <v-toolbar height="100">
    <v-container fluid>
      <v-row
          align="center"
          justify="center"
          dense
          class="pt-5"
      >
        <v-col align="left" :cols="!isExistSession ? 12 : 6">
          <v-btn outlined @click="onClickNewButton">
            <v-icon left>{{ Defs.ICON_PLUS }}</v-icon>
            <strong>NEW</strong>
          </v-btn>
        </v-col>

        <v-col
            v-show="isExistSession"
            align="right"
            cols="6"
        >
          <v-select
              :items="arrTableStyle"
              v-model="curTableStyle"
              label="Grid style"
              dense
              class="pt-5"
              style="width: 190px;"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "Header",
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' })
  },
  data: () => {
    return {
      isExistSession: false,
      curTableStyle: '',
      arrTableStyle: []
    }
  },
  watch: {
    state: {
      handler () {
        const state = this.state

        if (state.arrTunneling.length > 0) {
          this.isExistSession = true
          this.curTableStyle = state.curTableStyle
          this.arrTableStyle = state.arrTableStyle
        } else {
          this.isExistSession = false
          this.curTableStyle = ''
          this.arrTableStyle = []
        }
      },
      immediate: true,
      deep: true
    },
    curTableStyle: {
      handler () {
        const value = this.curTableStyle

        if (value !== null && value.length > 0) {
          this.setCurTableStyle(value)
        }
      },
      immediate: true,
      deep: false
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['setCurTableStyle']),
    onClickNewButton() {
      this.$emit('msgClickNewButton')
    }
  }
}
</script>

<style scoped>

</style>
