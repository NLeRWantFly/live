<template>
  <t-space direction="vertical" style="display: grid;justify-content: center">
      <t-layout>
        <t-header class="header">
          <t-space>
            <t-input v-model="username"></t-input>
            <t-button @click="toLive">选择直播界面</t-button>
            <t-button @click="toPaint">选择画板</t-button>
          </t-space>
          <t-space>
            <t-button @click="closeLive()" theme="danger" v-show="isLive">关闭直播</t-button>
          </t-space>
        </t-header>
        <t-layout>
          <t-content class="body">
            <div style="width: 90vw;max-height: 80vh;min-height:80vh;">
              <router-view></router-view>
            </div>
          </t-content>
        </t-layout>
        <t-footer>Designed by NLER</t-footer>
      </t-layout>
  </t-space>
</template>

<script>
import { getRoomStatus } from '../api/secret'
export default {
  name: "index",
  data(){
    return{
      username: '',
      status: ''
    };
  },
  mounted() {
    this.username = this.$route.query.username
    this.getStatus()
  },
  computed: {
    isLive() {
      return this.$route.meta.isLive
    }
  },
  methods:{
    toPaint(){
      this.$router.push({ path: "/live/paint", query: { username: this.username } });
    },
    toLive(){
      this.$router.push({ path: "/live/live", query: { username: this.username } });
    },
    closeLive() {
      this.$router.push({
        path: "/"
      })
    },
    async getStatus() {
      let res = await getRoomStatus("114514")
      console.log(res);
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
</style>
