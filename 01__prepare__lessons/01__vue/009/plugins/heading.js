const MyPlugin = {
    install(Vue, options) {
                // heading 组件
        // <heading :level="1" :title="title">{{title}}</heading>
        // <h2><svg><use x:href="#icon-cart"></svg></h2>
        Vue.component('heading', {
            functional: true,
            props: {
                level: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    default: ''
                },
                icon: {
                    type: String
                }
            },
            render(h, context) {
                let children = []

                // 属性获取
                const {
                    icon, title, level
                } = context.props;

                if (icon) {
                    // <svg><use xlink:href="#icon-cart"></svg>
                    children.push(h(
                        'svg',
                        { class: 'icon' },
                        [h('use', {attrs: {'xlink:href': '#icon-' + icon}})]
                    ));
                }

                // 拼接子节点
                children = children.concat(context.children);

                const vnode = h(
                    'h' + level,   // 参数1: tagname
                    { attrs: { title } }, // 参数2
                    children  // 参数3：孩子元素的数组
                )
                // 返回createElement返回的VNode
                return vnode;
            }
        })

    }
}

if (typeof window !== 'undefined' && window.Vue) {
    // 使用插件
    window.Vue.use(MyPlugin)
}