<template>
    <div>
        <p>
            <input type="text" :value="value" @input="onInput" v-on:keydown.enter="addCourse" v-focus class="inp">
            {{value}}
            <button @click="addCourse">新增</button>
        </p>
    </div>
</template>

<script>
    // import { focus } from '@/directive/focus.js'
    export default {
        props: ['value'],
        // mounted () {
        //     this.$refs.inp.focus();
        // },
        methods: {
            addCourse() {
                this.$emit('add-course')
            },
            onInput(e) {
                this.$emit('input', e.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .inp {
        margin: 5px;
    }
</style>