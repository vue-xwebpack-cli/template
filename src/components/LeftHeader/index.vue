<template lang="pug">
  div(:class="[$style.leftHeader]" :style="addStyle")
    span(:class="$style.necessary" v-if="necessary") *
    span(:class="[$style.leftHeaderText]") {{text}}
    span(:class="$style.colon") :
</template>

<script>
  export default {
    props: {
      text: {
        required: true
      },
      necessary: {
        type: Boolean,
        default: true
      },
      addStyle: Object
    }
  }
</script>

<style lang="stylus" module>
  .left-header
    font-size 16px
    display inline-block
    text-align right
    width 100px
    color #4d4d4d
    .necessary
      display inline-block
      width 10px
      color #e52877
      margin-right 5px
    .colon
      width 7px
      text-align center
    .margin-left-14
      margin-left 14px
  .width-80
    width 80px !important
  .width-130
    width 130px !important

</style>
