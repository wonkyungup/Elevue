<template>
  <v-card
      rounded="0"
      height="100%"
      class="overflow-hidden"
      color="transparent"
      elevation="0"
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
    isTitle: { type: Boolean, default: true },
    titleClass: { type: String, default: '' },
    isSubTitle: { type: Boolean, default: true },
    subTitleClass: { type: String, default: '' },
    isText: { type: Boolean, default: true },
    textClass: { type: String, default: '' },
    isActions: { type: Boolean, default: true },
    actionsClass: { type: String, default: '' }
  }
}
</script>

<style scoped>

</style>
