import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from './store'


Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
});

// context是服务器传递给vue实例的参数对象
export function createApp(context) {
  const store = createStore()
  // 1.获取router实例
  const router = createRouter();
  // 2.创建vue实例
  const app = new Vue({
    store, // 挂载
    router,
    context,
    render: h => h(App)
  });
  return { app, router, store };
}
