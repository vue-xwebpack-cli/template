<template lang="pug">
  div(:class="$style.timeRangeCalendar", :style="styleValue")
    div(@click.stop="show", v-if="$slots.header")
      slot(name="header")
    div(:class="$style.timeRangeCalendarValue", @click="show", v-else, :style="innerStyle")
      span(:style="innerStyle") {{tranDefault}}
      i.fas.fa-calendar-alt(:class="$style.rili", :style="innerStyle")
    SelectCalendar(:isShow="timeShow",
    :minDate="minDate",
    :maxDate="maxDate",
    :defaultValue="defaultValue",
    :dftTomorrow="dftTomorrow",
    :timeIsShow="timeIsShow",
    :openTime="openTime",
    @changeOption="changeTime",
    @closeBox="timeShow = false")
</template>
<script>
  import SelectCalendar from './Components/SelectCalendar.vue'
  import moment from 'moment'

  export default {
    props: {
      dftTomorrow: Boolean,
      minDate: String,
      maxDate: String,
      defaultText: {
        type: String,
        default: ''
      },
      defaultValue: {
        type: String,
        default: ''
      },
      styleValue: Object,
      innerStyle: Object,
      timeIsShow: {
        type: Boolean,
        required: false,
        default: false
      },
      openTime: String
    },
    data() {
      return {
        timeShow: false,
        calendarValue: ''
      }
    },
    components: {
      SelectCalendar
    },
    methods: {
      changeTime(val) {
        if (this.readOnly) return
        this.timeShow = false
        if (!this.timeIsShow) {
          val = moment(val, 'YYYY-MM-DD').format('YYYY.MM.DD')
        }
        this.calendarValue = val
        this.$emit('confirm', val)
      },
      show() {
        if (this.readOnly) return
        this.timeShow = true
      }
    },
    computed: {
      tranDefault() {
        return this.calendarValue || this.defaultValue || this.defaultText
      }
    }
  }
</script>
<style lang="stylus" module>

  .time-range-calendar
    margin-right 15px
    width 150px
    height 40px

  .time-range-calendar-value
    position relative
    width 100%
    height 100%
    line-height inherit
    border-radius 4px
    background-color white
    padding-left 7px
    text-align left
    color #5e5e5e
    border 1px solid $border-color
    cursor pointer

    > span
      line-height 40px

  .rili
    position absolute
    right 5px
    top 0
    cursor pointer
    color $active-red !important
    line-height 40px

  .row
    display block
    box-sizing border-box
    &after, &before
      content " "
      display table
      clear both

</style>
