<template>
    <div>
        <div v-for="item in items" :key="item.id">
            {{ item.value }}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: 'Hello world',
                items: [
                    {
                        id: 1,
                        value: 'Hello world'
                    }
                ]
            }
        },
        methods: {
            name() {
                
            }
        },
        computed: {
            // name() {
            //     return this.data 
            // }
        },
    }
</script>

<style lang="scss" scoped>

</style>