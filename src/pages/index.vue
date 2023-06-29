<template>
  <div>
    <div class="background">
      <iframe :src="iframeSrc"></iframe>
    </div>
    <!-- 其他内容 -->
    <div class="container" >
      <div class="text-block" style="font-weight: 500;font-size: 30px;text-align: center;">
        <span class="text">雪课堂·一点直播</span>
      </div>
      <t-input v-model="username" placeholder="请输入用户名" @enter="onEnter" @change="onChange" />
      <div>
        <t-button theme="primary" @click="goLive()">进入直播间</t-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      iframeSrc: "https://my.spline.design/untitled-0893e8e3c66d5a6426e2c0249329ec9b",
      username: ""
    };
  },
  methods: {
    goLive() {
      this.$router.push({
        path: "/live",
        query: {
          username: this.username
        }
      })
    }
  }
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.container {
  position: relative;
  left: 70vw;
  padding: 10px 20px;
  top: calc(50vh - 170px);
  width: 20%;
  height: 150px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: space-around;
  backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景透明度 */
}
.text {
  color:rgba(8, 70, 204, 0.8);
}

</style>
