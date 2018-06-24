<template>
    <div class="dialog">
        我是一个弹窗
        <button @click="add">增加</button>{{count}}
    </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    add() {
      this._data.count += 1;
    }
  }
};
</script>
<style>
.dialog {
  width: 200px;
  height: 120px;
  text-align: center;
  border: #ccc 1px solid;
  /* position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  z-index: 100000;
}
</style>

