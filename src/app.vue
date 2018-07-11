
<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/home">
            <span class="nav-item">HOME</span>
          </router-link>
        </li>
        <li>
          <router-link to="/blog">
            <span class="nav-item">BLOG</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/github">
            <span class="nav-item">GITHUB</span>
          </router-link>
        </li> -->
        <li>
          <router-link to="/demo">
            <span class="nav-item">DEMO</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>


<style>
* {
  padding: 0;
  margin: 0;
}

window,
html,
body {
  min-height: 100%;
}
nav {
  position: fixed;
  height: 44px;
  line-height: 44px;
  display: flex;
  background: #de3e2f;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
  width: 100%;
  color: #fff;
}
nav ul {
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
}

nav li {
  list-style: none;
  flex: 1;
  text-align: center;
}
nav a {
  text-decoration: none;
  color:#fff;
}

.content {
  padding-top: 54px;
}
</style>

