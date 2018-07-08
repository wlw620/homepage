<template>
  <div>
    <div>
      <button v-on:click="increment">加薪</button>
    </div>
  </div>
</template>

<script>
let ws = null;

export default {
  data() {
    return {
      msg: "",
      msgList: []
    };
  },
  created() {},
  methods: {
    increment(e) {
      alert('加薪');
      this.$store.commit("increment");
    }
  }
};
</script>
