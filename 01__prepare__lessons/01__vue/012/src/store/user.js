export default {
    namespaced: true,
    state: {
        isLogin: false,
        username: ''
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        },
        setUsername(state, username) {
            state.username = username
        }
    },
    getters: {
        welcome: state => state.username + ',欢迎回来'
    },
    actions: {
        // 参数1：vuex传递的上下文context: { commit, dispatch, state }
        login({commit}, username) {
            // 模拟登录api调用，1s钟以后如果用户名是amin则登录成功
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login')
                        commit('setUsername', username)
                        resolve()
                    } else {
                        reject()
                    }
                })
            }, 1000);
        }
    },
}