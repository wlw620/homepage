<template>
  <div id="app">
    <nav>
      <router-link to="/home">
        <span class="nav-item">HOME</span>
      </router-link>
      <i>|</i>
      <router-link to="/plane">
        <span class="nav-item">BLOG</span>
      </router-link>
      <i>|</i>
      <router-link to="/train">
        <span class="nav-item">GITHUB</span>
      </router-link>
    </nav>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style>
nav {
  height: 44px;
  line-height: 44px;
  display: flex;
}
nav a {
  display: inline-block;
  flex: 1;
  text-align: center;
}
</style>

<script>
</script>