<template>
    <div>
        <button @click="login" v-if="!isLogin">登录</button>
        <button @click="logout" v-else>注销</button>
    </div>
</template>

<script>
    export default {
        methods: {
            login() {
                window.isLogin = true;

                // 动态路由添加
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
            },
            logout(){
                window.isLogin = false;
                this.$router.push('/')
            }
        },
        computed: {
            isLogin() {
                return window.isLogin 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>