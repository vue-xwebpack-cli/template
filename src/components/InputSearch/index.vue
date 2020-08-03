<template lang="pug">
  div(:class="$style.container")
    span.fa.fa-search(:class="$style.icon")
    span
      input.input(:class="$style.input", :placeholder="placeholder", :value="value", @input="$emit('input', $event.target.value)")

</template>
<script>
  export default {
    props: {
      placeholder: String,
      value: String
    },
  }
</script>
<style lang="stylus" module>
  .container
    margin-right 15px
    display flex
    align-items center
    border 1px solid $border-color
    border-radius 3px
    background-color $reverse-color

  .icon
    padding 0 10px
    color $remark-color

  .input
    line-height 38px
    width 180px
</style>
