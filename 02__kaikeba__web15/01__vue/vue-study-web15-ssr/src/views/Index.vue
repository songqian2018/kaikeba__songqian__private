<template>
  <div>
      index page
      <p>{{$store.state.count}}</p>
      <button @click="store.commit('add')">add</button>
</div>
</template>

<script>
export default {
  // 约定预取逻辑编写在预取钩子asyncData中
  asyncData({ store }) {
        return store.dispatch("getCount");
  }
};
</script>

<style lang="scss" scoped>
</style>