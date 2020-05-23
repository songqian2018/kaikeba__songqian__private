<template>
    <div>
        <h2>Detail Page</h2>
        <div>
            <p>{{$route.params.name}}</p>
            <!-- <p>{{}}</p> -->
        </div>
    </div>
</template>

<script>
    export default {
        watch: {
            $route: {
                immediate: true,
                handler() {
                    console.log('获取详情')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>