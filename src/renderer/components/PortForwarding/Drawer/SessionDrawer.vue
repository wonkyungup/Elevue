<template>
  <v-navigation-drawer
      v-model="drawer"
      width="450"
      right
      absolute
      temporary
  >

  <directTitle
      v-show="isDirection"
      v-on:msgClickClose="onClickClose"
  ></directTitle>
  <step1Title
      v-show="isStageUpper"
      v-on:msgClickBack="onClickBack"
      v-on:msgClickClose="onClickClose"
  ></step1Title>

  <v-divider></v-divider>

  <directContext
      v-show="isDirection"
      v-on:msgClickContinue="onClickContinue"
  ></directContext>
  <step1Context
      v-show="isStageUpper"
      v-on:msgClickContinue="onClickContinue"
  ></step1Context>

  </v-navigation-drawer>
</template>

<script>
import Defs from '@/assets/js/constants'
import {
    directTitle,
    directContext,
    step1Title,
    step1Context
} from './template'

export default {
  name: "SessionDrawer",
  components: {
    directTitle,
    directContext,
    step1Title,
    step1Context
  },
  data: () => {
    return {
      drawer: false,
      isDirection: true,
      isStageUpper: false,
      isStageMiddle: false,
      isStageLower: false
    }
  },
  methods: {
    open () {
      const _this = this

      this.drawer = true
      _this.isDirection = true
      _this.isStageUpper = false
      _this.isStageMiddle = false
      _this.isRmoteConfig = false
    },
    close () {
      this.drawer = false
    },
    onClickClose () {
      this.close()
    },
    onClickBack (target) {
      const _this = this
      switch (target) {
        case Defs.STR_STAGE_UPPER:
          if (_this.isStageUpper) _this.isStageUpper = false
          _this.isDirection = true
        default:
          break
      }
    },
    onClickContinue (target) {
      const _this = this
      switch (target) {
        case Defs.STR_DIRECTION:
          if (_this.isDirection) _this.isDirection = false
          _this.isStageUpper = true
          break
        case Defs.STR_STAGE_UPPER:
          if (_this.isStageUpper) _this.isStageUpper = false
          _this.isStageMiddle = true
        default:
          break
      }
    }
  }
}
</script>
