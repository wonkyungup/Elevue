<template>
  <Card
      :titleClass="'pa-0'"
      :textClass="'pa-0'"
      :isSubTitle="false"
  >
    <template v-slot:title>
      <Title
        :arrTunnel="arrTunnel"
        v-on:msgClickNewButton="onClickNewButton"
      ></Title>
    </template>

    <template v-slot:text>
      <WelcomeBody v-if="!arrTunnel.length" />
      <SessionBody
        v-else
        :arrTunnel="arrTunnel"
        ref="SessionBody"
        v-on:msgClickEditButton="onClickEditButton"
        v-on:msgClickDeleteButton="onClickDeleteButton"
      />
    </template>

    <template v-slot:actions>
      <NewSession
        ref="NewSession"
        v-on:msgNewSession="setNewSession"
      />
      <EditSession
        ref="EditSession"
        :arrTunnel="arrTunnel"
        v-on:msgUpdateSession="onEditTunnel"
      />
      <DeleteSession
        ref="DeleteSession"
        :arrTunnel="arrTunnel"
        v-on:msgDeleteTunnel="onDeleteTunnel"
      />
    </template>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
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
import SessionListener from '@/assets/js/ssh/SessionListener'
import Session from '@/assets/js/ssh'
import Security from '@/assets/js/security'

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
  data: () => {
    return {
      arrTunnel: []
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants' })
  },
  mounted() {
    const db = new DB()
    db.getPortForwardingTableItems().then(rows => {
      if (rows.length > 0) {
        rows.forEach(async session => {
          await this.setNewSession(session)
        })
      }
    })
  },
  methods: {
    onClickNewButton () {
      this.$refs['NewSession'].open()
    },
    onClickEditButton () {
      this.$refs['EditSession'].open()
    },
    onEditTunnel (session) {
      this.arrTunnel.forEach(item => {
        if (item['_id'] === session['id']) {
          item['_session']['source_host'] = session['source_host']
          item['_session']['source_port'] = session['source_port']
          item['_session']['host'] = session['host']
          item['_session']['port'] = session['port']
          item['_session']['username'] = session['username']
          item['_session']['password'] = Security.decodeData(session['password'])
          item['_session']['destination_host'] = session['destination_host']
          item['_session']['destination_port'] = session['destination_port']
          item['_session']['authentication_method'] = session['authentication_method']
          item['_session']['passphrase'] = session['passphrase']
          item['_session']['private_key_id'] = session['private_key_id']
        }
      })
    },
    onClickDeleteButton () {
      this.$refs['DeleteSession'].open()
    },
    onDeleteTunnel (id) {
      this.arrTunnel = this.arrTunnel.filter(value => value['_id'] !== id)
    },
    onEventSessionListener (sessionListener) {
      sessionListener.on(SessionListener.MSG_SESSION_CONNECT_ATTEMPT, (_this) => {
        _this._stusConnect = SessionListener.MSG_SESSION_CONNECT_ATTEMPT
        
        if (!_this._isConnect) _this._isConnect = true
        if (!_this._alert['isShow']) _this._alert['isShow'] = true

        _this._alert['icon'] = this.Defs.ICON_CONNECTION
        _this._alert['type'] = this.Defs.STR_TYPE_WARNING
        _this._alert['content'] = 'Connecting to port. please wait a moment'

        _this.doSSHConnect()
      })

      sessionListener.on(SessionListener.MSG_SESSION_CONNECTED, (_this) => {
        _this._stusConnect = SessionListener.MSG_SESSION_CONNECTED

        if (!_this._isConnect) _this._isConnect = true
        if (!_this._alert['isShow']) _this._alert['isShow'] = true

        _this._alert['icon'] = this.Defs.ICON_CHECK
        _this._alert['type'] = this.Defs.STR_TYPE_SUCCESS
        _this._alert['content'] = 'The port has been connected successfully.'
      })

      sessionListener.on(SessionListener.MSG_SESSION_DISCONNECTED, async (_this) => {
        _this._stusConnect = SessionListener.MSG_SESSION_DISCONNECTED

        if (_this._isConnect) _this._isConnect = false
        if (!_this._alert['isShow']) _this._alert['isShow'] = true

        _this._alert['icon'] = this.Defs.ICON_CHECK
        _this._alert['type'] = this.Defs.STR_TYPE_INFO
        _this._alert['content'] = 'Port closed successfully.'

        await _this.doSSHDisconnect()
      })

      sessionListener.on(SessionListener.MSG_SESSION_ERROR, async (_this, errMsg) => {
        _this._stusConnect = SessionListener.MSG_SESSION_ERROR

        if (_this._isConnect) _this._isConnect = false
        if (!_this.alert['isShow']) _this.alert['isShow'] = true

        _this._alert['icon'] = this.Defs.ICON_ALERT_CIRCLE
        _this._alert['type'] = this.Defs.STR_TYPE_ERROR
        _this._alert['content'] = errMsg

        await _this.doSSHDisconnect()
      })
    },
    async setNewSession (param) {
      let sessionListener = new SessionListener()
      const session = await Session.allocate(sessionListener, param)

      if (session) this.onEventSessionListener(session._sessionListener)
      this.arrTunnel.push(session)
    }
  }
}
</script>

<style scoped>

</style>
