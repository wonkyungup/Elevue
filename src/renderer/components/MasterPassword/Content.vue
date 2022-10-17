<template>
  <BrowserContent>
    <template v-slot:content>
      <v-col cols="12" />
      <v-col cols="12">
        <div v-show="!isExistFiles">
          <h2><strong>🔓 </strong> Please remember your password</h2>
          <br>
          <p>
            This page is the password setting screen
            <br />
            <strong>*</strong>Please remember that it cannot be restored or changed
          </p>
        </div>

        <div v-show="isExistFiles">
          <h2><strong>🔐</strong> Please enter your password</h2>
          <br />
          <p>You have already set a password</p>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row dense justify="center">
          <v-col cols="7">
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
              :color="isError ? 'red' : 'primary'"
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
    },
    isExistFiles () {
      const files = new Files()
      return files.isExistFiles()
    }
  },
  watch: {
    password: {
      handler () {
        if (this.password.length > 0 || this.password.length === 0) {
          this.isError = false
        }
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
   ...mapActions('MasterPassword', ['setMasterKey']),
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
     const password = this.password

     this.setMasterKey(password)

     if (!files.isExistFiles()) {
       await files.createDBFile()
       await files.createINIFile(Security.encryption(password))
     }

     const { master } = await files.readINIFile()
     this.isError = !Security.isComparison(password, master)

      if (!this.isError) {
        await new DB().openDatabase()
        this.$emit('msgMasterPassword')
      }
   }
 }
}
</script>

<style scoped>

</style>
