<template lang="pug">
  div(v-if="modals.length")
    .mask(v-if="backdrop", :class="{transparent: backdrop === 'transparent'}", @click="toggle", v-touch="{enable: false}")
    component(v-for="{component, id, props, options} of modals",
      :is="component",
      :key="id",
      ref="modal",
      v-bind="props",
      v-show="options.show")

</template>
<script>
  import Vue from 'vue'

  import {addClass, isPromise, removeClass, ensure, warn, TIP_ID, PICKER_ID} from 'utils'

  export default {
    name: 'modal',
    beforeCreate() {
      Object.defineProperty(Vue.prototype, '$modal', {
        value: this,
        readable: true,
        writable: __DEV__ || __TESTING__
      })
    },
    data() {
      return {
        currModal: null,
        modals: []
      }
    },
    computed: {
      backdrop() {
        return this.currModal && this.currModal.options.backdrop
      },
      currModalId() {
        return this.currModal && this.currModal.id
      }
    },
    watch: {
      currModal: modal => (modal ? addClass : removeClass)(document.body, 'modal-open')
    },
    methods: {
      clear() {
        this.currModal = null
        this.modals = []
      },
      close(modalId, destroy) {
        modalId = modalId || this.currModalId
        if (!modalId) return
        const modal = this.getModal(modalId)
        if (!modal) return
        const {options} = modal
        options.show = false
        const modalRef = this.getModalRef(modalId)
        const modalItem = modalRef.$children[0]
        modalItem || warn(`this modal is not a Vue component, HiModal will not respect it's transition`)

        // 解决多个同类型模态框连续展示的问题，不需要使用destroyed 方法
        const callback = resolve => {
          options.destroy || destroy ? this.removeModal(modalId) : this.resetCurrModal(modalId)
          resolve()
        }

        const propsData = modalItem && modalItem.$options.propsData
        return new Promise(resolve => propsData && propsData.transition
            ? ensure(modalRef.$el, 'animationend transitionend', () => callback(resolve)) : callback(resolve))
      },
      resetCurrModal(modalId) {
        modalId === this.currModalId && (this.currModal = null)
      },
      removeModal(modalId, destroyed) {
        const modalIndex = this.getModalIndex(modalId)
        modalIndex + 1 && this.modals.splice(modalIndex, 1)
        this.resetCurrModal(modalId)
        destroyed && destroyed()
      },
      getModal(modalId) {
        return this.modals.find(m => m.id === modalId)
      },
      getModalIndex(modalId) {
        return this.modals.findIndex(m => m.id === modalId)
      },
      getModalRef(modalId) {
        return this.$refs.modal[this.getModalIndex(modalId)]
      },
      mount(modal) {
        const modalId = modal.id
        const m = this.getModal(modalId)
        const component = modal.component
        const options: void | {backdrop: void | boolean | 'static' | 'transparent'} = modal.options
        const props = modal.props
        if (m) {
          Object.assign(m.props, props)
          Object.assign(m.options, options)
          component && (m.component = component)
          modal = m
        } else {
          if (!component) throw new ReferenceError('no component passed on initialization')
          modal.options = {...options}
          modal.props = {...props}
          this.modals.push(modal)
        }
        const currModalId = this.currModalId
        if (currModalId && [TIP_ID, PICKER_ID].includes(modalId)) {
          return (modal.props.backdrop = !this.currModal.options.backdrop)
        }

        // currModalId === modalId || this.close() 加promise以后手动关闭所有模态框
        modal.options.show && (this.currModal = modal)
      },
      open(modal: {id: void | string | number, component: void | Object, options: void | Object, props: void | Object}) {
        modal.id = modal.id || 'modal_' + +new Date()
        isPromise(modal.component)
            ? modal.component.then(component => this.mount(Object.assign(modal, {component}))) : this.mount(modal)
        return modal.id
      },
      toggle() {
        if (this.backdrop === 'static') return
        const close = this.currModal.props.close
        close ? close.apply(this.getModalRef(this.currModalId), arguments) : this.close()
      }
    }
  }
</script>
