<template>
  <div>
    <v-container>
      <v-row align="center" dense>
        <v-col cols="8">
          <v-text-field
              autofocus
              v-model="hostname"
              placeholder="Hostname"
              outlined
              dense
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
              v-model="port"
              placeholder="Port"
              outlined
              dense
              type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
              autofocus
              v-model="username"
              placeholder="Username"
              outlined
              dense
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
              autofocus
              v-model="password"
              placeholder="Password"
              outlined
              dense
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
  name: "Remote",
  data: () => {
    return {
      hostname: '',
      port: null,
      username: '',
      password: ''
    }
  },
  methods: {
    onClickContinue () {
      const config = {
        hostname: this.hostname,
        port: this.port,
        username: this.username,
        password: this.password
      }

      this.$emit('msgClickContinue', config)
    }
  }
}
</script>

<style scoped>

</style>
