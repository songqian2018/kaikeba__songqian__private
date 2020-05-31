// 1. 创建传入的组件实例
// 2. 挂载它从而生成dom结构
// 3. 生成dom结构追加到body
// 4. 淘汰机制：不需要时组件实例应当被销毁

import Vue from 'vue'

export default function create(Component, props) {
    // console.log(Component)
    // 1. 创建传入的组件实例
    // // new Vue
    // const vm = new Vue({
    //     render(h) {
    //         // 返回虚拟DOM
    //         // console.log(h(Component, { props }))
    //         return h(Component, { props })
    //     }
    // })
    //  // 只挂载，进行初始化，不进行dom操作
    // vm.$mount()
    // console.log(vm)
    // document.body.appendChild(vm.$el)
    // // 获取组件实例
    // const comp = vm.$children[0];

    // 附加一个删除方法
    // comp.remove = () => {
    //     // 移除dom
    //     document.body.removeChild(vm.$el)
    //     // 销毁组件
    //     vm.$destroy();
    // }

    // Vue.extend
    const Ctor = Vue.extend(Component) 
    const comp = new Ctor({propsData: props}) 
    comp.$mount(); 
    document.body.appendChild(comp.$el) 
    comp.remove = () => { // 移除dom 
        document.body.removeChild(comp.$el) 
        // 销毁组件 
        comp.$destroy(); 
    }

    return comp;
}