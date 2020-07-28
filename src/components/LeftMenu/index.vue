<template lang="pug">
  div(:class="$style.container")
    div(:class="$style.header")
      div
        img.img-circle(:src="icon", alt="测试")
      div 测试

    MenuList(:menus="menus")
</template>
<script>
  import menus from './menu.js'
  import MenuList from './MenuList'
  export default {
    data() {
      return {
        icon: require('assets/logo.png'),
        menus
      }
    },
    components: {
      MenuList
    }
  }
</script>
<style lang="stylus" module>
  .container
    position fixed
    left 0
    top 0
    bottom 0
    width 200px
    padding-top 50px
    background-color #393D49
    z-index 300
    color $reverse-color
    overflow-y auto

  .header
    position fixed
    top 0
    left 0
    width 200px
    display flex
    padding 8px 10px
    align-items center
    background-color #23262E
    z-index 2

    > div:first-child
      > img
        width 30px
        height 30px

    > div:nth-child(2)
      padding 0 5px
      font-weight bold
      font-size 16px
      line-height 34px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
</style>
