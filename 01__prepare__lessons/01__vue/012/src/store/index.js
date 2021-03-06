import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import persist from './plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        }
    },
    actions: {
        // 参数1：vuex传递的上下文context: { commit, dispatch, state }
        login({commit}, username) {
            // 模拟登录api调用，1s钟以后如果用户名是amin则登录成功
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login')
                        resolve()
                    } else {
                        reject()
                    }
                })
            }, 1000);
        }
    },
    modules: {
        user
    },
    strict: true,
    plugins: [
        persist
    ]
})