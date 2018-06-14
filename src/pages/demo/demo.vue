<template>
  <div>
    <ul>
      <li>
        <router-link to="/demo/socket">
          <span class="nav-item">socket</span>
        </router-link>
      </li>
    </ul>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgList: []
    };
  }
};
</script>
