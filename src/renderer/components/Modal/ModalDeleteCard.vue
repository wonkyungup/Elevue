<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        max-width="550"
        @keydown.enter="doesKeyDownEnterEvent"
    >
      <Card
          :titleClass="'text-h5'"
          :isSubTitle="false"
          :color="''"
      >
        <template v-slot:title>
          Are you sure you want to delete that session?
        </template>

        <template v-slot:text>
          <br />
          If the session is deleted, <strong class="font-weight-bold">recovery is not possible</strong>.<br />
          wish to delete, please enter <strong class="font-italic font-weight-thin">{{ str }}</strong>

          <v-text-field
              v-model="input"
              class="pt-4"
              dense
              outlined
              placeholder="delete session"
              color="error"
          />
        </template>

        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize" @click="close">Close</v-btn>
          <v-btn
              text
              class="text-capitalize"
              @click="onClickDeleteSession"
              :disabled="isValidToDelete"
          >
            Delete
          </v-btn>
        </template>
      </Card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Card } from '../Layout'
import { mapState, mapActions } from 'vuex'
import DB from '@/model'

export default {
  name: "ModalDeleteCard",
  components: {
    Card
  },
  computed: {
    ...mapState({ state: 'PortForwarding' }),
    isValidToDelete () {
      return this.input !== this.str
    }
  },
  data: () => {
    return {
      dialog: false,
      str: 'delete session',
      input: ''
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['deletedArrTunneling']),
    open () {
      this.dialog = true
      this.input = ''
    },
    close () {
      this.dialog = false
    },
    doesKeyDownEnterEvent () {
      if (this.input !== this.str) {
        this.close()
      } else {
        this.onClickDeleteSession()
      }
    },
    onClickDeleteSession () {
      const id = this.state.selectID
      const db = new DB()

      if (id > 0) {
        db.deletePortForwardingItem(id).then(deleted => {
          if (deleted) {
            this.deletedArrTunneling()
            this.close()
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>