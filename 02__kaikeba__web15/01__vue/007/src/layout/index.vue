<template>
  <div class="app-wrapper">
    <!-- 导航 -->
    <side-menu></side-menu>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>

  import SideMenu from '@/components/SideMenu'
  import Sidebar from '@/components/Sidebar'

  export default {
    components: {
      SideMenu,
      Sidebar
    }
  }
</script>