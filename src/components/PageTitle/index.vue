<template lang="pug">
  div(class="page-title")
    div(class="page-title-name") {{title}}
    slot
</template>
<script>
  export default {
    props: {
      title: String
    }
  }
</script>
<style lang="stylus">
  .page-title
    display flex
    padding 0 20px
    align-items center
    justify-content space-between
    background-color $reverse-color
    box-shadow 0 2px 3px 0 rgba(202, 202, 202, 0.44)
    border-radius 5px
    min-height 70px

  .page-title-name
    font-size 18px
    font-weight 700
    color $stress-color
</style>
