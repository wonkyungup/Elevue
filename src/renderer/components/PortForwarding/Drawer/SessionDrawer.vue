<template>
  <v-navigation-drawer
      v-model="drawer"
      width="450"
      right
      absolute
      temporary
  >

  <directTitle
      v-show="isOrder.direction"
      v-on:msgClickClose="onClickClose"
  ></directTitle>
  <step1Title
      v-show="isOrder.step1"
      v-on:msgClickBack="onClickBack"
      v-on:msgClickClose="onClickClose"
  ></step1Title>

  <v-divider></v-divider>

  <directContext
      v-show="isOrder.direction"
      v-on:msgClickContinue="onClickContinue"
  ></directContext>
  <step1Context
      v-show="isOrder.step1"
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
      isOrder: {
        direction: true,
        step1: false,
        step2: false,
        step3: false
      }
    }
  },
  methods: {
    clearValue () {
      const _isOrder = this.isOrder
      _isOrder.direction = true
      _isOrder.step1 = false
      _isOrder.step2 = false
      _isOrder.step3 = false
    },
    open () {
      this.drawer = true
      this.clearValue()
    },
    close () {
      this.drawer = false
    },
    onClickClose () {
      this.close()
    },
    onClickBack (target) {
      const _isOrder = this.isOrder
      switch (target) {
        case Defs.STR_STEP_1:
          if (_isOrder.step1) _isOrder.step1 = false
          _isOrder.direction = true
        default:
          break
      }
    },
    onClickContinue (target) {
      const _isOrder = this.isOrder
      switch (target) {
        case Defs.STR_DIRECTION:
          if (_isOrder.direction) _isOrder.direction = false
          _isOrder.step1 = true
          break
        case Defs.STR_STEP_1:
          if (_isOrder.step1) _isOrder.step1 = false
          _isOrder.step2 = true
        default:
          break
      }

      console.log(this.isOrder)
    }
  }
}
</script>
