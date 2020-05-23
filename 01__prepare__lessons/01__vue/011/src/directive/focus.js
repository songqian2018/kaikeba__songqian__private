import Vue from 'vue'


// 自定义指令
const focus = Vue.directive('focus', {
    inserted (el) {
        console.log('focus running')
        el.focus()
    }
})

export { focus }