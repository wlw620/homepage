<template>
  <div>
    <div>
      <input type="text" placeholder="服务器推送更新消息">
      <button v-on:click="send">推送</button>
    </div>
    <div>
      <h6>消息列表</h6>
      <div>{{msg}}</div>
    </div>
  </div>
</template>

<script>
let ws = null;

export default {
  data() {
    return {
      msg: '',
      msgList: []
    };
  },
  created() {
    if (window.WebSocket) {
      ws = new WebSocket("ws://127.0.0.1:7001");

      ws.onopen = res => {
        console.log("连接服务器成功");
        ws.send("hello!");
      };

      ws.onclose = res => {
        console.log("服务器关闭");
      };

      ws.onerror = () => {
        console.log("连接出错");
      };

      ws.onmessage = res => {
        console.log("连接成功", res);
        this.$data.msg = res.data;
      };
    }
  },
  methods: {
    send(e) {
      console.error(e);
      ws.send("123");
    }
  }
};
</script>
