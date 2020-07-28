<template lang="pug">
  div(:class="$style.quickPager")
    div(:class="$style.quickPagerContent")
      span(:class="$style.quickPagerInfo") 共{{page.totalRows}}条,{{page.totalPages}}页
      ol(:class="")
        li(@click="gotoPage(1, isFirstPage)" :class="isFirstPage ? $style.isValidIcon : ''")
          i.iconfont.icon-double-arrow-left(:class="$style.icon")
        li(@click="gotoPage(page.currentPage - 1, isFirstPage)" :class="isFirstPage ? $style.isValidIcon : ''")
          i.iconfont.icon-arrow-lift(:class="$style.icon")
        li(v-for="pager in getNumbers" @click="gotoPage(pager, isCurrentPage(pager))"
          :class="isCurrentPage(pager) ? [$style.isCurrentPage, 'theme-bg'] : ''") {{pager}}
        li(@click="gotoPage(page.currentPage + 1, isLastPage)" :class="isLastPage ? $style.isValidIcon : ''")
          i.iconfont.icon-arrow-right(:class="$style.icon")
        li(@click="gotoPage(page.totalPages, isLastPage)" :class="isLastPage ? $style.isValidIcon : ''")
          i.iconfont.icon-double-arro-right(:class="$style.icon")
    div(style="clear: both")
</template>

<script>
  export default {
    data() {
      return {
        operation: {}
      }
    },
    props: {
      page: {
        required: true
      }
    },
    computed: {
      getNumbers() {
        if (this.page.totalPages <= 5) {
          return this.page.totalPages
        } else {
          if (this.page.currentPage <= 3) {
            return 5
          } else {
            if (this.page.totalPages - this.page.currentPage <= 2) {
              return [this.page.totalPages - 4, this.page.totalPages - 3, this.page.totalPages - 2, this.page.totalPages - 1, this.page.totalPages]
            } else {
              return [this.page.currentPage - 2, this.page.currentPage - 1, this.page.currentPage, this.page.currentPage + 1, this.page.currentPage + 2]
            }
          }
        }
      },
      isFirstPage() {
        return this.page.currentPage === 1
      },
      isLastPage() {
        return this.page.currentPage === this.page.totalPages
      }
    },
    methods: {
      isCurrentPage(page) {
        return this.page.currentPage === page
      },
      gotoPage(toPage, tag) {
        if (tag) {
          return
        }
        var startIndex = ((toPage - 1) < 0 ? 0 : (toPage > this.page.totalPages ? this.page.totalPages - 1 : (toPage - 1))) * this.page.pageRows
        // console.log('startIndex:' + startIndex + 'pageRows:' + this.page.pageRows + 'currentPage' + toPage)
        this.$emit('QuickPager', {'startIndex': startIndex, 'pageRows': this.page.pageRows, 'currentPage': toPage})
      }
    }
  }
</script>

<style lang="stylus" module>
  .quick-pager
    padding 8px 20px
    background-color #fff

    .quick-pager-content
      float right
      display flex
      align-items center
      color #5e5e5e
      ol
        float: left
        margin 0
        padding 0
        list-style none
        li
          float left
          cursor pointer
          height 23px
          line-height 23px
          padding 0 8px
          margin-left 5px
          text-align center
        .is-current-page
          color #fff
        .is-valid-icon
          cursor not-allowed
        .icon
          font-size 16px
          transform scale(1.5)
          color #777777
    .quick-pager-content .is-valid-icon i
      color #cdcdcd
    .quick-pager-info
      display inline-block
      height 24px
      float left
      margin-right 15px
      line-height 24px
</style>
