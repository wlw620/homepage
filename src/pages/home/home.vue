<template>
  <div>
    HELLO, {{text}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
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
  }
};
</script>
