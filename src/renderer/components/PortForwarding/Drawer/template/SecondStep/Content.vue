<template>
    <v-list dense>
      <Card :isSubTitle="false">
        <template v-slot:title>
          <p v-if="isRemote()" class="text-sm-body-1">Select the remote host:</p>
          <p v-else class="text-sm-body-1">Set the local port and binding address:</p>
        </template>
  
        <template v-slot:text>
          <TextLocal v-show="isLocal()"></TextLocal>
          <TextRemote v-show="isRemote()"></TextRemote>
          <TextSocksv5 v-show="isSocksv5()"></TextSocksv5>
        </template>
  
        <template v-slot:actions>
          <v-container>
            <v-row align="center" dense>
              <v-col cols="7">
                <v-text-field
                  autofocus
                  v-model="hostname"
                  placeholder="Server Address"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="port"
                  placeholder="Port"
                  outlined
                  dense
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="username"
                  placeholder="Username"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
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
        </template>
      </Card>
    </v-list>
  </template>
  
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { TextLocal, TextRemote, TextSocksv5 } from './Text'
  import { Card } from '@/components/Layout'
  
  export default {
    name: "Content",
    components: {
      Card,
      TextLocal,
      TextRemote,
      TextSocksv5
    },
    data: () => {
      return {
        hostname: '',
        port: null,
        username: '',
        password: ''
      }
    },
    watch: {
      'state.isFirstStep': {
        handler () {
          this.hostname = ''
          this.port = ''
          this.username = ''
          this.password = ''
        },
        immediate: false,
        deep: true
      }
    },
    computed: {
      ...mapState({ state: 'PortForwarding' }),
      ...mapGetters('PortForwarding', ['isLocal', 'isRemote', 'isSocksv5'])
    },
    methods: {
      ...mapActions('PortForwarding', ['setContinueSecondStep', 'setSessionSecondStep']),
      onClickContinue () {
        const hostname = this.hostname
        const port = this.port
        const username = this.username
        const password = this.password
  
        if (hostname && port) {
          this.setSessionSecondStep({ hostname, port, username, password }) // password 16x
          this.setContinueSecondStep()
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  