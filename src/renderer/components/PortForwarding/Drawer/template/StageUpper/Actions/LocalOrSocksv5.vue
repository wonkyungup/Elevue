<template>
  <div>
    <v-container>
      <v-row align="center" dense>
        <v-col cols="10">
          <v-text-field
              autofocus
              v-model="hostname"
              placeholder="Binding Hostname"
              outlined
              dense
          ></v-text-field>
        </v-col>
        <v-col cols="10">
          <v-text-field
              v-model="port"
              placeholder="Source Port"
              outlined
              dense
              type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center" dense>
        <v-col cols="10">
          <v-btn block color="primary" @click="onClickContinue">Continue</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "LocalOrSocksv5",
  data: () => {
    return {
      hostname: '',
      port: null
    }
  },
  methods: {
    onClickContinue () {
      const config = {
        hostname: this.hostname,
        port: this.port
      }

      this.$emit('msgClickContinue', config)
    }
  }
}
</script>

<style scoped>

</style>
