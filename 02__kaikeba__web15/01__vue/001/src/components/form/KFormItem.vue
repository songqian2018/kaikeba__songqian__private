<template>
    <div>
        <label v-if="label" for="">{{label}}</label>
        <slot></slot>
        <p class="error" v-if="error">{{error}}</p>
        <!-- {{form.rules[prop]}} -->
    </div>
</template>

<script>
    import Schema from 'async-validator'
    export default {
        inject: ['form'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String
            }
        },
        data() {
            return {
                error: ''
            }
        },
        mounted () {
            this.$on('validate', () => {
                this.validate()
            })
        },
        methods: {
            validate() {
                // 0. 获取校验规则和当前值
                const rules = this.form.rules[this.prop];
                const value = this.form.model[this.prop];
                // 1. 创建Schema实例
                const schema = new Schema({
                    [this.prop]: rules
                })
                // 2. 使用该实例进行校验
                return schema.validate({
                    [this.prop]: value
                }, errors => {
                    if (errors) {
                        this.error = errors[0].message;
                        // console.log(this.error)
                    } else {
                        this.error = ''
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .error {
        color: #f00;
    }
</style>