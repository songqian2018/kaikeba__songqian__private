<template>
    <div>
        <button @click="login" v-if="!isLogin">登录</button>
        <button @click="logout" v-else>注销</button>
    </div>
</template>

<script>

    import { mapState, mapActions } from 'vuex'

    export default {
        methods: {
            login() {
                // window.isLogin = true;

                // 方法 1
                // 提交mutation变更状态
                // this.$store.commit('login')

                // 动态路由添加
                // this.$router.addRoutes([
                //     {
                //       path: '/admin',
                //       name: 'admin',
                //       component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
                //       children: [
                //         {
                //           path: '/admin/course/:name',
                //           name: 'detail',
                //           component: () => import('../views/Detail.vue')
                //         },
                //       ]
                //     }
                // ])

                // this.$router.push(this.$route.query.redirect)


                // 方法2
                // 派发动作，触发actions
                // this.$store.dispatch('login', 'admin').then(() => {
                //     this.$router.addRoutes([
                //         {
                //         path: '/admin',
                //         name: 'admin',
                //         component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
                //         children: [
                //             {
                //             path: '/admin/course/:name',
                //             name: 'detail',
                //             component: () => import('../views/Detail.vue')
                //             },
                //         ]
                //         }
                //     ])

                //     this.$router.push(this.$route.query.redirect)
                // }).catch(() => {
                //     alert('用户名或密码错误，请重试')
                // })

                // 方法3
                // this.$store.dispatch('user/login', 'admin').then(() => {
                //     this.$router.addRoutes([
                //         {
                //         path: '/admin',
                //         name: 'admin',
                //         component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
                //         children: [
                //             {
                //                 path: '/admin/course/:name',
                //                 name: 'detail',
                //                 component: () => import('../views/Detail.vue')
                //             },
                //         ]
                //         }
                //     ])

                //     this.$router.push(this.$route.query.redirect)
                // }).catch(() => {
                //     alert('用户名或密码错误，请重试')
                // })

                // 方法4
                this['user/login']('admin').then(() => {
                    this.$router.addRoutes([
                        {
                        path: '/admin',
                        name: 'admin',
                        component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
                        children: [
                            {
                                path: '/admin/course/:name',
                                name: 'detail',
                                component: () => import('../views/Detail.vue')
                            },
                        ]
                        }
                    ])

                    this.$router.push(this.$route.query.redirect)
                }).catch(() => {
                    alert('用户名或密码错误，请重试')
                })

            },
            logout(){
                // window.isLogin = false;

                // 方法1
                // 提交mutation变更状态
                // this.$store.commit('logout')


                // 方法3
                this.$store.commit('user/logout')

                this.$router.push('/')
            },
            ...mapActions(['user/login', 'user/logout'])
            // ...mapActions('user', ['login'])
        },
        computed: {
            // isLogin() {
            //     // return this.$store.state.isLogin
            //     return this.$store.state.user.isLogin
            // }
            ...mapState('user', ['isLogin'])
        },
    }
</script>

<style lang="scss" scoped>

</style>