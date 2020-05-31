<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" 
      foo="foo"
      ref="hw"
      @myclick="onmyclick"/> -->
    <!-- <HelloWorld /> -->
    <!-- <HelloWorld>
      <template>插槽传递的数据</template>
      <template v-slot:content>具名插槽传递的数据</template>
      <template v-slot:footer="slotProps">作用域插槽传递的数据{{slotProps.foo}}</template>
      <template v-slot:footer="{foo}">作用域插槽传递的数据{{foo}}</template>
    </HelloWorld> -->

    <!-- 
      form测试
     -->
     <form-test></form-test>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import FormTest from '@/components/form'

export default {
  name: 'App',
  provide() {
    return {
      foo: 'foo'
    }
  },
  components: {
    // HelloWorld
    FormTest
  },
  mounted () {
    // this.$refs.hw.xx = 'xxxxxx'
    // // 子组件的实例是不保证的
    // this.$children[0].xx = 'ooooo';
  },
  methods: {
    onmyclick() {
      console.log('子组件被点击了')
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
