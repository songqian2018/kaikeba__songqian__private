<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 弹窗组件 -->
    <message ref="msgSuccess" class="success">
        <!-- 具名插槽：title -->
        <template v-slot:title="slotProps">
            <strong>{{slotProps.title}}</strong>
        </template>
        <!-- 默认插槽内容 -->
        <template v-slot:default>
            新增课程成功！
        </template>
    </message>

    <message ref="msgWarning" class="warning">
        <!-- 具名插槽：title -->
        <template v-slot:title>
            <strong>警告</strong>
        </template>
        <!-- 默认插槽内容 -->
        <template v-slot:default>
            请输入课程名称！
        </template>
    </message>
    <!-- 
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/> 
    -->
    <course-list :courses="courses"></course-list>
    <!--用户输入-->
    <course-add v-model="course" @add-course="addCourse"></course-add>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CourseList from '@/components/CourseList.vue'
import CourseAdd from '@/components/CourseAdd.vue'
import Message from '@/components/Message.vue'
import { getCourses } from '@/api/course'
import Vue from 'vue'

// 总线
Vue.prototype.$bus = new Vue();

export default {
  name: 'App',
  components: {
    // HelloWorld
    CourseList,
    CourseAdd,
    Message
  },
  data() {
    return {
      title: '我的购物车',
      course: '',
      courses: [],
      publicPath: process.env.BASE_URL
    }
  },
  async created() {
      // 组件实例已经创建，由于未挂载，dom不存在
      const courses = await getCourses();
      this.courses = courses;
  },
  methods: {
    addCourse() {
        if (this.course) {
            this.courses.push({name: this.course});
            this.course = ''
            // this.isShow = true;
            this.$refs.msgSuccess.toggle();
        } else {
            // this.showWarn = true;
            this.$refs.msgWarning.toggle();
        }
    }
  },
}
</script>

<style lang="scss">
    a {
      color: $color;
    }
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    /*
        动画样式
    */
    .fade-enter-active, 
    .fade-leave-active { 
        transition: opacity .5s; 
    }
    .fade-enter, 
    .fade-leave-to { 
        opacity: 0; 
    }
</style>

<style lang="scss" scoped>

</style>