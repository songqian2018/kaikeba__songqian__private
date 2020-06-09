<template>
  <!-- 1.hidden存在则不显示 -->
  <li v-if="!model.hidden">
    <div @click="toggle">
      <!-- 2.设置icon才显示图标 -->
      <svg-icon v-if="hasIcon" :icon-class="model.meta.icon"></svg-icon>
      <span v-if="isFolder">
        <!-- 3.设置标题才显示 -->
        <span v-if="hasTitle">{{model.meta.title}}</span>
        [{{open ? '-' : '+'}}]
      </span>
      <!-- 4.如果是叶子节点，显示为链接 -->
      <template v-else>
        <router-link :to="resolvePath(model.path)">{{title}}</router-link>
      </template>
    </div>
    <!-- 5.子树设置base-path -->
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model.path"
        :base-path="resolvePath(model.path)"
      ></item>
    </ul>
  </li>
</template>
<script>
// resolvePath方法需要用到path库
import path from "path";
export default {
  name: "Item",
  props: {
    model: Object,
    // 新增basePath保存父路由path
    basePath: {
      type: String,
      default: ""
    }
  },
  computed: {

    isFolder: function() {
      return this.model.children && this.model.children.length;
    },

    hasIcon() {
      return this.model.meta && this.model.meta.icon;
    },
    hasTitle() {
      return this.model.meta && this.model.meta.title;
    },

    title() {
      return this.hasTitle
        ? this.model.meta.title
        : this.model.name
        ? this.model.name
        : this.model.path;
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    // 拼接子路由完整path
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
};
</script>