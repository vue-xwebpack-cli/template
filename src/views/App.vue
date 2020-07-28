<template lang="pug">
  #app
    TopMenu
    LeftMenu

    div(:class="$style.container")
      router-view(transition="fade")

    loading(v-if="progress", :progress="progress")
    Modal#modal
</template>
<script>
  import {mapGetters} from 'vuex'
  import Loading from 'components/Widgets/Loading'
  import LeftMenu from 'components/LeftMenu'
  import TopMenu from 'components/TopMenu'
  import Modal from 'components/Modal'

  export default {
    name: 'app',
    computed: {
      ...mapGetters(['progress'])
    },
    data() {
      return {
        img: require('assets/logo.png')
      }
    },
    components: {
      Loading,
      LeftMenu,
      Modal,
      TopMenu
    }
  }
</script>
<style lang="stylus" module>
  .container
    margin-left 200px
    margin-top 50px
</style>
