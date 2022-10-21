<template>
  <v-card
      :rounded="rounded"
      :height="height"
      :class="classCard"
      :color="color"
      :elevation="elevation"
  >
    <v-card-title v-show="isTitle" :class="titleClass">
      <slot name="title"></slot>
    </v-card-title>

    <v-card-subtitle v-show="isSubTitle" :class="subTitleClass">
      <slot name="subTitle"></slot>
    </v-card-subtitle>

    <v-card-text v-show="isText" :class="textClass">
      <slot name="text"></slot>
    </v-card-text>

    <v-card-actions v-show="isActions" :class="actionsClass">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "Card",
  props: {
    rounded: {
      type: String,
      default: '0'
    },
    height: {
      type: String,
      default: '100%'
    },
    classCard: {
      type: String,
      default: 'overflow-hidden'
    },
    color: {
      type: String,
      default: 'transparent'
    },
    elevation: {
      type: String,
      default: '0'
    },
    isTitle: {
      type: Boolean,
      default: true
    },
    titleClass: {
      type: String,
      default: ''
    },
    isSubTitle: {
      type: Boolean,
      default: true
    },
    subTitleClass: {
      type: String,
      default: ''
    },
    isText: {
      type: Boolean,
      default: true
    },
    textClass: {
      type: String,
      default: 'pb-0'
    },
    isActions: {
      type: Boolean,
      default: true
    },
    actionsClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
