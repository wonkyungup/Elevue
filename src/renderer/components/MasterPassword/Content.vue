<template>
  <BrowserContent>
    <template v-slot:content>
      <v-col cols="12" />
      <v-col cols="12">
        <h2>Please remember your password</h2>
        <br>
        <h2>Recovery is not possible</h2>
        * Be sure to remember
      </v-col>
      <v-col cols="12">
        <v-row dense justify="center">
          <v-col cols="6">
            <v-text-field
                @keydown.enter="onKeydownEnter"
                @keydown.esc="onKeydownESC"
                autofocus
                v-model="password"
                placeholder="Password"
                outlined
                dense
                :error-messages="isError ? 'Incorrect master password' : ''"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn
              icon
              color="primary"
              :disabled="isDisabled"
              @click="onClickNext"
            ><v-icon>{{ Defs.ICON_ARROW_RIGHT_CIRCLE }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </template>
  </BrowserContent>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BrowserContent } from '../Layout'
import Files from '@/assets/js/files'
import Security from '@/assets/js/security'
import DB from '@/model'

export default {
  name: "Content",
  components: {
    BrowserContent
  },
  data: () => {
    return {
      isNext: false,
      isError: false,
      password: ''
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'MasterPassword' }),
    isDisabled () {
      if (this.password.length > 0) {
        return false
      }
      return true
    }
  },
  watch: {
    password: {
      handler () {
        if (this.password.length > 0) {
          this.isError = false
        }
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
   ...mapActions('MasterPassword', ['setDBKey']),
   async onKeydownEnter () {
     if (this.password.length > 0) {
       await this.onClickNext()
     }
    },
    onKeydownESC () {
      if (this.password.length > 0) {
        this.password = ''
      }

      if (this.isError) {
        this.isError = !this.isError
      }
    },
    async onClickNext () {
      const files = new Files()
      const isMaster = await files.createINIFile(Security.encryption(this.password))

      if (!isMaster) {
        const pathDB = await files.createDBFile()
        if (pathDB) {
          const db = new DB(pathDB)
          await db.createTable(4, this.password)
        }

        this.$emit('msgMasterPassword')
      }
      else {
        const { master } = await files.readINIFile()
        this.isError = !Security.isComparison(this.password, master)

        if (!this.isError) {
          this.$emit('msgMasterPassword')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
