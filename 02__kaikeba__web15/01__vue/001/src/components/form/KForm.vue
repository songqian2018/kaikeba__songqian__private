<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        provide() {
            return {
                form: this
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object
            }
        },
        methods: {
            validate(cb) {
                // 调用所有formitem的validate，只要一个失败就失败
                // promise数组
                const tasks = this.$children
                    .filter(item => !!item.prop)
                    .map(item => item.validate())
                // 判断所有结果
                Promise.all(tasks)
                    .then(() => cb(true))
                    .catch(() => cb(false))
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>