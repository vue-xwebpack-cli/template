<template lang="pug">
  div
    div
      div(@click='toggleShow(menu)', :class="$style.menuRow")
        div(:class="$style.menuRowLeft")
          div(:class="[$style.menuRowLeftLine]")
          i.iconfont(:class="[menu.menuIcon, {[$style.colorIcon]: showIconColor(menu)}, $style.iconfont]")
        div(:class="[$style.menuRowRight]")
          span(:style="{'font-size': fontSizeName(menu.level)}", :title='menu.menuName', :class="menu.selected && menu.children.length <= 0 ? 'theme-color' : ''") {{menu.menuName}}
          i.iconfont.icon-arrow-up(:class="[$style.iconfont, !menu.show ? $style.rotate : '']", v-if='menu.children.length>0 ')


      div(:class="$style.subMenu", v-if="menu.children.length", :style="computeHeight(menu)")
        div(ref="subMenu")
          div(v-for="m in menu.children", @click='menuSpread(m)', :class="m.selected ? ['theme-color', $style.selected] : ''") {{m.menuName}}
            span.them-bd(:class="$style.border", v-if="m.selected")

</template>

<script>
  import {closeModal} from 'utils'

  export default {
    props: {
      menu: Object,
      menus: Array
    },
    name: 'MenuList',
    data() {
      return {
        height: 0
      }
    },
    watch: {
      menus: {
        deep: true,
        handler() {
        }
      }
    },
    methods: {
      toggleShow(menu) {
        menu.show = !menu.show
        if (!menu.children.length && menu.url) {
          this.recursion(this.menus, menu)
          this.$router.push(menu.url)
        }
        // this.$forceUpdate()
      },
      fontSizeName(level) {
        switch (level) {
          case '0' :
            return '17px'
          case '1' :
            return '15px'
          case '2' :
            return '13px'
        }
      },
      computeHeight(menu) {
        return {
          height: menu.show ? menu.children.length * 40 + 'px' : '0'
        }
      },
      menuSpread(menu) {
        if (menu.url) {
          menu.selected = true
          this.recursion(this.menus, menu)

          this.$router.push(menu.url)
          // closeModal()
        }
        // menu.selected = !menu.selected
      },
      recursion(all, temp) {
        all && all.forEach(item => {
          if (item.menuName !== temp.menuName) {
            item.selected = false
            this.recursion(item.children, temp)
          }
        })
      },
      showIconColor(menu) {
        let show = false
        if (menu.level === '0') {
          menu.children.forEach(item => {
            if (item.children.length <= 0 && item.selected) {
              show = true
            }
            if (item.children.length > 0) {
              item.children.forEach(item => {
                if (item.selected) {
                  show = true
                }
              })
            }
          })
        }
        return show
      }
    }
  }
</script>

<style module lang="stylus">
  .iconfont
    padding 0

  .menu-row
    width 200px
    height 41px
    font-size 14px
    line-height 41px
    color #58656c
    display flex
    justify-content flex-start
    cursor pointer

    &:hover
      color #1587cd
      background-color rgba(#1587cd, 0.09)

  .menu-row-left
    width 47px
    display flex

  .iconfont
    color #d7d8d9
    margin-left 25px
    transition transform .5s ease

  .color-icon
    color #1587cd

  .menu-row-left-line
    height 100%

  .menu-row-right
    padding-right 25px
    display flex
    flex 1
    align-items center
    justify-content space-between

    .iconfont
      margin-left 10px
      color #d7d8d9
      font-size 12px

    .rotate
      transform rotateX(180deg) scale(1.3)

    span
      display block
      flex 1
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      color $reverse-color

  .icon-color
    font-size 14px
    color #e40177


  .menu-row-selected
    background-color $reverse-color

  .menu-selected
    border-left 4px solid #1587cd
    background-color rgba(#1587cd, 0.09)
    color #1587cd

  .subMenu
    overflow hidden
    transition height .5s ease

    > div
      > div
        position relative
        padding 0 25px 0 57px
        line-height 40px
        font-size 14px
        cursor pointer


      > div:hover
        background-color #3f464d


  .selected
    background-color $reverse-color!important

  .border
    border-left 5px solid
    position absolute
    left 0
    top 0
    bottom 0
    z-index 1


</style>
