<template lang="pug">
  .page-container
    PageTitle(title="编辑")
    .page-body(:class="$style.body")
      div(:class="$style.goodsInfo")
        div(:class="$style.left") 基本信息

        div
          div(:class="$style.flexRow")
            LeftHeader(text="姓名")

            div(:class="$style.info")
              input(placeholder="请输入姓名", maxlength=30, style="width: 500px", v-model.trim="name")
              span(:class="$style.errorTip", v-if="nameError") {{nameError}}

          div(:class="$style.flexRow")
            LeftHeader(text="手机号")

            div(:class="$style.info")
              input(placeholder="请输入手机号", maxlength=11, style="width: 500px", v-model.trim="mobile")
              span(:class="$style.errorTip", v-if="mobileError") {{mobileError}}

          div(:class="$style.flexRow")
            LeftHeader(text="所属部门")

            div(:class="$style.info")
              input(placeholder="请输入所属部门", maxlength=50, style="width: 500px", v-model.trim="department")
              span(:class="$style.errorTip", v-if="departmentError") {{departmentError}}

      div(:class="$style.footer")
        .btn.btn-theme-default() 返回
        .btn.btn-theme-primary(@click="save") 保存
</template>
<script>
  import LeftHeader from 'components/LeftHeader'
  export default {
    data() {
      return {
        name: '',
        nameError: '',
        mobile: '',
        mobileError: '',
        department: '',
        departmentError: ''
      }
    },
    methods: {
      validate() {
        if (!this.name) {
          this.nameError = '请输入姓名'
          return false
        }
        this.nameError = ''
        if (!this.mobile || !/^[0-9]{11}$/.test(this.mobile)) {
          this.mobileError = '请输入正确手机号'
          return false
        }
        this.mobileError = ''
        return true
      },
      save() {
        const validate = this.validate()
        if (!validate) {
          return false
        }
        this.$util.toast('编辑成功!')
      }
    },
    components: {
      LeftHeader
    }
  }
</script>
<style lang="stylus" module>
  .body
    background-color white
    padding 20px
    border-radius 5px
    font-size: 14px

  .left
    font-weight bold
    width 100px
    line-height 40px

  .flex-row
    display flex
    margin-bottom 20px
    line-height 40px

  .error-tip
    color #e52877
    font-size 14px
    margin-left 10px

  .info
    margin-left 22px
    > input
      font-size 14px
      padding-left 12px
      height 36px
      border 1px solid $border-color
      border-radius 3px

    > textarea
      width 900px
      outline 0
      resize none
      height 100px
      padding-left 12px
      overflow hidden
      border 1px solid $border-color
      line-height 25px
      &::placeholder
        color $placeholder-color

  .footer
    margin-top 20px
    display flex
    justify-content center
    > div
      width 100px
      height 40px
      padding 0
      line-height 40px
      text-align center
      border-radius 5px
      margin-left 40px
      cursor pointer
</style>
