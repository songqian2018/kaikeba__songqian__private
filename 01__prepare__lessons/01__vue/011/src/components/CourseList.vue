<template>
    <div>
        <!--条件渲染-->
        <p v-if="courses.length == 0">没有任何课程信息</p>
        <!--列表渲染-->   
        <div :class="['course-list', $style.red]" v-else>
            <transition-group name="fade">
                <div v-for="c in courses" 
                    :key="c.name" 
                    :class="{[$style.active]: selectedCourse === c}" 
                    :style="{backgroundColor: (selectedCourse === c ? '#ddd' : 'transparent')}"
                    @click="gotoDetail(c)">
                    <!-- <router-link :to="`/admin/course/${c.name}`">{{ c.name }} -- {{c.price | currency('￥')}}</router-link> -->
                    {{ c.name }} -- {{c.price | currency('￥')}}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            gotoDetail(c) {
                this.selectedCourse = c;
                // this.$router.push(`/admin/course/${c.name}`)
                this.$router.push({
                    name: 'detail',
                    params: {
                        name: c.name
                    }
                })
            }
        },
        data () {
            return {
                selectedCourse: null,
            }
        },
        props: {
            courses: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        filters: {
            currency(value, symbol = '￥') {
                return symbol + value;
            }
        }
    }
</script>

<style scoped>
        .active {
            background-color: #ddd;
        }
</style>

<style module>
    .active {
        background-color: #ddd;
    }
    .red {
        color: #f00;
    }
</style>