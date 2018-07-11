<template>
  <div class="hotel-list">
    <ul id="example-1">
      <li v-for="item in list">
        <div class="left">
          <img :src="item.picUrl">
        </div>
        <div class="right">
          <p class="hotelname">{{ item.hotelName }}</p>
          <p class="trafficinfo">{{ item.address }}</p>
          <p class="desc">
            <span class="" v-if="item.commentScore">
              <span class="score">
                {{ item.commentScore }} 分
              </span>
              <span>{{ item.commentDes }}</span>
            </span>
            <span class="" v-else>
              暂无评价
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
.hotel-list li {
  display: flex;
  margin-bottom: 10px;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid #eee;
}
.hotel-list .left {
  width: 120px;
  height: 154px;
}
.hotel-list .left img {
  width: 120px;
  height: 154px;
}
.hotel-list .right {
  width: 100%;
  overflow: hidden;
  padding-left: 10px;
  font-size: 14px;
  flex: 1;
}

.hotelname {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.trafficinfo {
  padding-top: 5px;
  font-size: 12px;
}
.desc {
  padding-top: 5px;
  font-size: 12px;
  color: #666;
}

.score {
  color: red;
  font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      list: [],
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
        this._data.list = data.hotelList;
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
