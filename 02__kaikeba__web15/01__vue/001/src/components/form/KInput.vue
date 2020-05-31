<template>
    <div>
        <!--
            input事件处理，值赋值

        -->
        <input type="text" @input="onInput" :value="value" v-bind="$attrs">
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        methods: {
            onInput(e) {
                // 转发input事件
                this.$emit('input', e.target.value)
                console.log(this)
                // 通知校验
                this.$parent.$emit('validate')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>