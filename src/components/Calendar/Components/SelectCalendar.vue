<template lang="pug">
  div(v-show="isShow", :class="$style.selectCalendar", @click.stop="", :style="topCss")
    div.theme-bg(:class="$style.selectCalendarDay")
      i.icon.fas.fa-angle-double-left(:class="$style.prevYear", @click="prevYear()")
      i.icon.fas.fa-angle-left(:class="$style.prevMonth", @click="prevMonth()")
      span(:class="$style.month") {{ currentMonthText }}
      i.icon.fas.fa-angle-right(:class="$style.nextMonth", @click="nextMonth()")
      i.icon.fas.fa-angle-double-right(:class="$style.nextYear", @click="nextYear()")
    div
      ol(:class="$style.calendarWeek")
        li 日
        li 一
        li 二
        li 三
        li 四
        li 五
        li 六
        li(v-for="option in optionList", @click="selectedCurrentDay(option)",
        :class="{[$style.colorGray]: !(option.isNowMonth), 'theme-color': isSelectedDay(option), [$style.selectDay]: isSelectedDay(option), [$style.disabled]: option.disabled}") {{option.date | formatDate('D')}}

    div(:class="$style.calendarTime" v-show='timeIsShow')
      span 时间点：
      input(:class="$style.timeHourMin", maxlength='2', type='text', v-model='hour')
      span :
      input(:class="$style.timeHourMin", maxlength='2', type='text', v-model='min')

    div(:class="$style.footer")
      div.theme-color.theme-bd(:class="$style.calendarClose", @click="closeBox()") 取消
      div.theme-bg.theme-bd(:class="$style.calendarSure", @click="selectedDaySubmit()") 确定
</template>

<script>
  import moment from 'moment'

  import {firstDayOfWeek} from 'utils'

  const DATE_FORMAT = 'YYYY-MM-DD'
  const MONTH_FORMAT = 'YYYY-MM'

  export default {
    props: {
      maxDate: String,
      minDate: String,
      defaultValue: String,
      isShow: {
        type: Boolean,
        required: true
      },
      topCss: {
        type: String,
        required: false
      },
      timeIsShow: {
        type: Boolean,
        required: false,
        default: false
      },
      openTime: String
    },
    data() {
      const now = this.defaultValue ? moment(this.defaultValue)
        : moment()
      return {
        selectedDay: now.format(DATE_FORMAT),
        optionTime: now.format(DATE_FORMAT),
        optionList: [],
        currentMonth: now.format(MONTH_FORMAT),
        hour: '00',
        min: '00'
      }
    },
    created: function () {
      if (this.minDate) {
        this.selectedDay = this.minDate > this.selectedDay ? this.minDate : this.selectedDay
      } else if (this.maxDate) {
        this.selectedDay = this.maxDate > this.selectedDay ? this.selectedDay : this.maxDate
      }

      this.currentMonth = moment(this.selectedDay).format(MONTH_FORMAT)

      this.changeTime()
    },
    watch: {
      minDate(newVal) {
        this.selectedDay = newVal
        this.currentMonth = moment(this.selectedDay).format(MONTH_FORMAT)
        this.changeTime()
        this.$emit('changeOption', '')
      },
      maxDate(newVal) {
        this.selectedDay = newVal
        this.currentMonth = moment(this.selectedDay).format(MONTH_FORMAT)
        this.changeTime()
        this.$emit('changeOption', '')
      },
      hour() {
        this.hour = Number(this.hour) > 23 ? '23' : this.hour
      },
      min() {
        this.min = Number(this.min) > 59 ? '59' : this.min
      }
    },
    computed: {
      currentMonthText() {
        return moment(this.currentMonth + '-01').format('YYYY年MM月')
      }
    },
    methods: {
      isSelectedDay(option) {
        return this.selectedDay === option.date
      },
      changeTime() {
        this.optionList = []
        const firstDay = moment(firstDayOfWeek(moment().format(this.currentMonth + '-01'))).add(-1, 'd')
        for (let i = 0; i < 42; i++) {
          const curr = moment(firstDay.format(DATE_FORMAT)).add(i, 'd')
          const disabled = (this.minDate && (curr.format(DATE_FORMAT) < this.minDate)) ||
                              (this.maxDate && (curr.format(DATE_FORMAT) > this.maxDate))
          this.optionList.push({
            date: curr.format(DATE_FORMAT),
            isNowMonth: curr.format(MONTH_FORMAT) === this.currentMonth,
            disabled: disabled
          })
        }
      },
      prevYear() {
        this.changeOptionTime('year', -1)
      },
      prevMonth() {
        this.changeOptionTime('month', -1)
      },
      nextYear() {
        this.changeOptionTime('year', 1)
      },
      nextMonth() {
        this.changeOptionTime('month', 1)
      },
      changeOptionTime(type, val) {
        if (type === 'year') {
          this.currentMonth = moment(this.currentMonth + '-01').add(val, 'y').format(MONTH_FORMAT)
        } else {
          this.currentMonth = moment(this.currentMonth + '-01').add(val, 'M').format(MONTH_FORMAT)
        }

        this.changeTime()
      },
      selectedCurrentDay(option) {
        if (option.disabled) return
        this.selectedDay = option.date
      },
      closeBox() {
        this.$emit('closeBox')
      },
      selectedDaySubmit() {
        if (!this.timeIsShow) {
          this.$emit('changeOption', this.selectedDay)
        } else {
          if (this.openTime) {
            const time = this.openTime.split(':')
            const openHour = time[0]
            const openMin = time[time.length - 1]
            if (Number(this.hour) < Number(openHour)) this.hour = openHour
            if (Number(this.hour) <= Number(openHour) && Number(this.min) < Number(openMin)) this.min = openMin
            if (moment(this.selectedDay).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
              const nowHour = moment().format('HH')
              const nowMin = moment().format('mm')
              if (Number(this.hour) < Number(nowHour)) this.hour = nowHour
              if (Number(this.hour) <= Number(nowHour) && Number(this.min) < Number(nowMin)) this.min = nowMin
            }
          }
          this.$emit('changeOption', moment(this.selectedDay).format('YYYY-MM-DD') + ' ' + (this.hour || '00') + ':' + (this.min || '00'))
        }
      }
    }
  }
</script>

<style lang="stylus" module>
  $active-red = #d5091d
  .calendar-week
    list-style none
    margin 5px
    padding 0
    background-color white

    > li
      float left
      cursor pointer
      width 25px
      height 25px
      line-height 25px
      margin 0 3px
      text-align center

  .colorGray
    color darkgray

  .selectDay
    color $reverse-color

  .select-calendar
    border 1px solid gainsboro
    width 230px
    background-color white
    margin-top 3px
    z-index 111
    position absolute

  .select-calendar-day
    color white
    width 230px
    text-align center
    line-height 40px
    height 40px
    > i
      height 16px
      line-height 16px
      font-size 10px
      cursor pointer
      color white !important
      transform scale(1.4)

  .month
    margin-right 5px

  .prevMonth
    margin-left 15px
    margin-right 10px

  .nextMonth
    margin-left 10px
    margin-right 15px
  .month
    margin-right 5px

  .prevMonth
    margin-left 15px
    margin-right 10px

  .nextMonth
    margin-left 10px
    margin-right 15px

  .calendar-btn
    clear both
    text-align center
    display flex

  .calendar-close
    margin 10px 20px 10px 30px
    display inline-block
    width 78px
    height 30px
    line-height 30px
    cursor pointer
    background-color white
    border 1px solid

  .calendar-sure
    display inline-block
    width 80px
    height 30px
    line-height 30px
    color white
    cursor pointer
    margin-bottom 10px
    margin-top 10px
    border 1px solid


  .footer
    clear both
    text-align center

    > div
      cursor pointer

  .disabled
    color darkgray
    cursor not-allowed!important

  .calendar-time
    margin 10px 0 0 10px

  .time-hour-min
    border 1px solid gainsboro
    padding 0 5px
    font-size 12px
    box-sizing border-box
    color @input-font-color
    display inline-block
    height 32px
    width 70px

</style>
