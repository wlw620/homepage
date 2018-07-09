<template>
  <div>
    HELLO23, {{text}}, {{text1}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      text1: "",
      test: 1
    };
  },
  created() {
    fetch("http://localhost:4000/api/mockData", {
      method: "get"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this._data.text = data.text;
      })
      .catch(err => {
        console.error(err);
      });

    fetch("/api/mockData1", {
      method: "get"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this._data.text1 = data.text;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>
