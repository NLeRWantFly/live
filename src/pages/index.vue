<template>
  <div>
    <div class="background">
      <iframe :src="iframeSrc"></iframe>
    </div>
    <!-- 其他内容 -->
    <div class="container" style="position: relative; left: 70vw; width: 20%; height: 30%; border: 1px solid black; border-radius: 5px; display: flex; flex-direction: column; ustify-content: center">
      <div class="text-block" style="font-weight: 500;font-size: 30px;text-align: center;">
        <span class="text">雪课堂·一点直播</span>
      </div>
      <t-input v-model="username" placeholder="请输入用户名" @enter="onEnter" @change="onChange" />
      <div>
        <t-button theme="primary">进入直播间</t-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      iframeSrc: "https://my.spline.design/untitled-0893e8e3c66d5a6426e2c0249329ec9b"
    };
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
  width: 20%;
  height: 30%;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景透明度 */
}

</style>
