<template lang="pug">
  div(:class="$style.container")
    h3 Hello! your name is {{ username }} and your web page's title is {{ title }} now.
    h3 You can refresh your web page to change your name and title.
    h2 Essential Links
    ul
      li
        a(href="https://vuejs.org", target="_blank") Core Docs
      li
        a(href="https://forum.vuejs.org", target="_blank") Forum
      li
        a(href="https://chat.vuejs.org", target="_blank") Community Chat
      li
        a(href="https://twitter.com/vuejs", target="_blank") Twitter

      br

      li
        a(href="http://vuejs-templates.github.io/webpack/", target="_blank")   Docs for This Template

    h2 Ecosystem
    ul
      li
        a( href="http://router.vuejs.org/", target="_blank") vue-router

      li
        a(href="http://vuex.vuejs.org/", target="_blank") vuex

      li
        a(href="http://vue-loader.vuejs.org/", target="_blank") vue-loader

      li
        a(href="https://github.com/vuejs/awesome-vue", target="_blank") awesome-vue
</template>
<script>
  import {changeTitle} from 'utils'
  export default {
    data() {
      return {
        title: '',
        username: ''
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
  .container
    h1, h2
      font-weight normal

    ul
      list-style-type none
      padding 0

    li
      display inline-block
      margin 0 10px

    a
      color #42b983

</style>
