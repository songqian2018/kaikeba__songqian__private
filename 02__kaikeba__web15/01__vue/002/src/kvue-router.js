// 声明插件： vue插件需要声明一个install方法
let Vue; // 保存vue构造函数引用


class KVueRouter {
    constructor (options) {
        this.$options = options;
        this.routeMap = {};         // { '/index': { component: Index } }
        // 当前url需要是响应式的
        this.app = new Vue({
            data: { current: '/' }
        })
    }

    // 解析route
    // 监听事件
    // 声明组件
    // 初始化
    init () {
        // 监听事件
        this.bindEvents();
        // 解析route
        this.createRouteMap();
        // 声明组件
        this.initComponent();
    }

    bindEvents() {
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/';
        console.log(this.app.current)
    }

    createRouteMap() {
        // 遍历用户配置的路由数组
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route;
        })
    }

    initComponent() {
        // 转换目标： <a href="/">xxx</a>
        // <router-link to="/">
        Vue.component('router-link', {
            props: {
                to: String
            },
            render () {
                // h(tag, data, children)
                // 使用createElement函数
                // return h('a', {
                //     attrs: { href: '#' + this.to }
                // }, [this.$slots.default]);
                
                // 使用jsx
                return <a href={'#' + this.to}>{this.$slots.default}</a>
            }
        })

        Vue.component('router-view', {
            render: (h) => {
                console.log(this.routeMap)
                const Component = this.routeMap[this.app.current].component;
                console.log(Component)
                return h(Component);
            }
        })
    }
}

// 参数是Vue构造函数
KVueRouter.install = function(_Vue) {
    Vue = _Vue;

    // 实现一个混入
    Vue.mixin({
        beforeCreate(){
            // 获取KVueRouter实例并挂载到Vue.prototype
            if (this.$options.router) {
                // 根组件beforeCreate时执行一次
                Vue.prototype.$router = this.$options.router;

                // 路由器初始化
                this.$options.router.init();
            }
        }
    })
}


export default KVueRouter