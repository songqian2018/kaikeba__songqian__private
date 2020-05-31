<template>
  <div class="hello" @click="$emit('myclick')">
    <h1>{{ msg }}</h1>
    <!-- $attrs -->
    <p>{{ $attrs.foo }}</p>
    <!-- $refs -->
    <p @click="sayHello">{{ xx }}</p>
    <!-- 祖先和子孙之间通信 -->
    <p>{{ foo }}</p>
    <!-- $root -->
    <p>{{$root.bar}}</p>
    <!-- slot -->
    <p>
      <slot></slot>
    </p>
    <p>
      <slot name="content"></slot>
    </p>
    <p>
      <slot name="footer" :foo="foo"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  inject: [
    'foo'
  ],
  props: {
    msg: String
  },
  data() {
    return {
      xx: 'xx'
    }
  },
  created () {
    // 监听事件
    this.$parent.$on('hiBrother', (event) => {
      if (this === event) {
        console.log(event)
      } else {
        console.log('来自兄弟的问候')
      }
    })
  },
  methods: {
    sayHello() {
      this.$parent.$emit('hiBrother', this)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
