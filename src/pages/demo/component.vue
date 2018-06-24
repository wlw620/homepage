<template>

  <div>
    <button @click="alert">Dialog</button>
    <dialog-component v-if="windowPopFlag"></dialog-component>
    <dialog-component v-if="windowPopFlag"></dialog-component>
  </div>
</template>



<script>
const DialogComponent = () =>
  import(/* webpackChunkName: "group_dialog" */ "../components/dialog/dialog.vue");

export default {
  data() {
    return {
      windowPopFlag: false
    };
  },
  methods: {
    alert() {
      this._data.windowPopFlag = true;
      this.$aa();
    }
  },
  components: {
    "dialog-component": DialogComponent
  }
};
</script>
