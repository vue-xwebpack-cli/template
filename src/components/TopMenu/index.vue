<template lang="pug">
  div(:class="$style.topTitle")
    div(:class="$style.titleBody")
      div
      div(:class="$style.user", @click.stop="toggleInfo")
        img(:class="$style.logo", :src="logo")
        span 青菜
        span.iconfont.icon-arrow-down-filling(:class="[$style.icon, showInfo ? $style.rotate : '']")

      div(:class="[$style.hiddenInfo, showInfo ? $style.show : $style.hidden]")

        div(@click="$router.push('/manage/staff-modify-pwd')")
          span.iconfont.icon-xiugaimima.theme-color
          span 修改密码

        div(@click.stop="logout")
          span.iconfont.icon-tuichuzhanghao.theme-color
          span 退出登录
</template>
<script>
  export default {
    data() {
      return {
        showInfo: false,
        logo: require('assets/member-logo.png'),
        listener: null
      }
    },
    mounted() {
      this.listener = () => {
        this.showInfo = false
      }

      window.addEventListener('click', this.listener)
    },
    methods: {
      toggleInfo() {
        this.showInfo = !this.showInfo
      },
      logout() {}
    },
    beforeDestroy(): void {
      window.removeEventListener('click', this.listener)
    }
  }
</script>
<style lang="stylus" module>
  .topTitle
    position fixed
    display flex
    padding 10px 0
    left 200px
    top 0
    right 0
    background-color #23262E
    z-index 300

  .titleBody
    position relative
    width 100%
    display flex
    justify-content space-between

    > div
      padding 0 20px
      white-space nowrap

  .logo
    margin-right 10px
    border-radius 50%
    width 30px
    height 30px

  .user
    cursor pointer
    color $remark-lighter-color

  .icon
    display inline-block
    padding 0 3px
    transition transform .3s ease

  .hiddenInfo
    position fixed
    z-index 10
    right 20px
    top 60px
    width 130px
    padding 7px 15px
    background-color $reverse-color
    border-radius 3px
    box-shadow 0 3px 6px rgba(202, 202, 202, 0.3)
    transition all .5s ease

    > div
      display flex
      align-items center

      > :nth-child(2)
        flex 1
        padding-left 8px
        overflow: hidden;
        text-overflow ellipsis
        white-space nowrap

    > div:nth-child(n)
      padding 8px 0
      cursor pointer

  .show
    transform-origin top
    transform scaleY(1)
    opacity 1

  .hidden
    transform-origin top
    transform scaleY(0)
    opacity 0

  .rotate
    transform rotateX(180deg)
</style>
