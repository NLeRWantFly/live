<template>
  <div>
    <!-- 将Fastboard挂载到指定的div -->
    <div ref="fastboardContainer" style="width: 80vw;height: 70vh"></div>
  </div>
</template>

<script>
import { onBeforeUnmount } from "vue";
import { createFastboard, mount } from "@netless/fastboard";
import { getRoomUUID, getRoomToken } from "../api/secret.js";

export default {
  name: "paint",
  mounted() {
    this.mountFastboard();
  },
  beforeUnmount(){
    this.unmountFastboard();

  },
  methods:{
    async mountFastboard() {
      const roomUUId = await getRoomUUID("114514").then((res) => {
        // 处理房间 UUID 的返回结果
        console.log(res);
        return res.data; // 返回房间 UUID
      });

      const roomToken = await getRoomToken("114514").then((res) => {
        console.log(res);
        return res.data;
      }); // 获取房间 Token，此处需自行实现

      this.app = await createFastboard({
        sdkConfig: {
          appIdentifier: "AvqLkBWCEe6IHCl_Ck-bAw/uiDogVuvylNn5w",
          region: "cn-hz",
        },
        joinRoom: {
          uid: this.$route.query.username,
          uuid: roomUUId,
          roomToken: roomToken,
        },
        managerConfig: {
          cursor: true,
        },
      });

      window.app = this.app;
      mount(this.app, this.$refs.fastboardContainer);
    },
    async unmountFastboard() {
      if (this.app) {
        this.app.destroy();
        this.app = null;
      }
    },
  }
}
</script>

<style scoped>
</style>
