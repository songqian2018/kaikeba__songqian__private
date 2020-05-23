
// 自定义指令
const focus = {
    inserted (el) {
        console.log('focus running')
        el.focus()
    }
}

export default focus