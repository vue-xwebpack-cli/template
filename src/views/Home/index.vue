<template lang="pug">
  .page-container
    PageTitle(title="首页")
      .flex-center
        Dropdown(:options="options")
        Calendar
        InputSearch(placeholder="输入姓名搜索", v-model="username", @input="username = $event")
        span.btn-middle.btn-theme-primary 搜索

    .page-body
      div(:class="$style.items")
        div
          span 姓名
          span 密码
          span 创建时间
          span 操作

        div
          span 张三
          span 123456
          span
          span(:class="$style.btns")
            span.btn.btn-theme-primary 编辑
            span.btn.btn-theme-primary 删除


      Pager(:page="page")


</template>
<script>
  import moment from 'moment'
  import {changeTitle} from 'utils'

  export default {
    data() {
      return {
        title: '',
        username: '',
        options: [{name: '全部', code: ''}, {name: '六年级', code: '6'}],
        page: {
          startIndex: 0,
          currentPage: 1,
          totalRows: 0,
          totalPages: 5,
          pageRows: 20
        }
      }
    },
    async created() {
      const data = (await this.$http.post('/get-home-data')).data
      Object.assign(this, data)
      changeTitle(data.title)
    }
  }
</script>
<style lang="stylus" module>
  .items
    > div
      display flex
      align-items center
      border-bottom 1px solid $border-color

      > span
        flex 1
        line-height $item-height
        padding 0 20px

    > div:first-child
      background-color $item-header-bg

  .btns
    > span:nth-child(2)
      margin-left 10px
</style>
