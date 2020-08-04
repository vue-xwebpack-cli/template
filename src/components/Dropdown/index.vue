<template lang="pug">
  div(:class="$style.container")
    div(:class="$style.content", @click="toggleShow")
      span(:style="{width, color}") {{selectedName || '请选择'}}
      i.fas.fa-caret-up(:class="show ? '' : $style.rotate")
    div(:class="$style.drop", v-show="show && options.length>0")
      ul
        li(v-for="option,j in options", @click="selectOption(option.code, option.name, j)",
          :title="option.name") {{option.name}}
</template>
<script>
  export default {
    data() {
      return {
        selectedName: '',
        show: false,
        interval: null
      }
    },
    props: {
      options: {
        required: true
      },
      defaultOption: {
        required: false
      },
      width: {
        required: false,
        default: '120px'
      },
      color: {
        required: false,
        default: '#333'
      }
    },
    created: function () {
      this.selectedName = this.defaultOption
      this.interval = () => {
        this.show = false
      }
      document.addEventListener('click', this.interval, true)
    },
    methods: {
      toggleShow() {
        this.show = !this.show
      },
      selectOption(code, name, j) {
        this.show = false
        this.selectedName = name
        this.$emit('selectOption', code, j)
      }
    },
    watch: {
      options: function (val, oldVal) {
        if (val.length === oldVal.length) {
          return
        }
        if (val !== oldVal) {
          this.selectedName = this.defaultOption
        }
      },
      defaultOption: function (val, oldVal) {
        if (val !== oldVal) {
          this.selectedName = this.defaultOption
        }
      }
    },
    beforeDestroy(): void {
      document.removeEventListener('click', this.interval)
    }
  }
</script>
<style lang="stylus" module>
  .container
    margin-right 15px
    height 40px
    cursor pointer
    color #303030
    position relative
    background-color $reverse-color
    border 1px solid $border-color
    border-radius 3px

  .content
    display inline-flex
    align-items center
    width 100%
    height 40px
    line-height 40px
    border-radius 5px

    span
      font-size 14px
      margin-left 10px
      display inline-block
      overflow hidden
      white-space nowrap
      text-overflow: ellipsis
      line-height: 40px
      vertical-align: top
      padding-right 20px

    i
      display inline-block
      font-size: 16px
      position absolute
      color #5e5e5e
      right: 10px
      line-height: 40px
      transform scale(1.3)

  .rotate
    transform rotate(180deg) scale(1.3) !important

  .drop
    border 1px solid #d0d0d0
    absolute()
    top 42px
    width 100%
    z-index 111
    background-color hsla(0, 0%, 100%, 1)
    overflow auto
    border-radius 3px

    ul
      max-height 160px
      border-radius 5px

      li
        height 40px
        line-height 40px
        font-size 14px
        padding-left 10px
        padding-right 10px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis

        &:hover
          background-color #edf6fd
</style>
