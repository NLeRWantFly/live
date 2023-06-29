<template>
  <t-space direction="vertical" style="display: grid;justify-content: center">
      <t-layout>
        <t-header>
          <t-input v-model="username"></t-input>
          <t-button @click="toLive">选择直播界面</t-button>
          <t-button @click="toPaint">选择画板</t-button>
        </t-header>
        <t-layout>
          <t-content>
            <div style="width: 80vw;height: 70vh;border: 1px solid black">
              <router-view></router-view>
            </div>
          </t-content>
        </t-layout>
        <t-footer>Designed by NLER</t-footer>
      </t-layout>
  </t-space>
</template>

<script>
import Live from '../components/live.vue'
import Paint from '../components/paint.vue'
import Chat from '../components/chat.vue'

export default {
  name: "index",
  data(){
    return{
      username: '123456',
    };
  },
  methods:{
    toPaint(){
      console.log("turn to paint");
      this.$router.push({ path: "/live/paint", query: { username: this.username } });
    },
    toLive(){
      console.log("turn to live");
      this.$router.push({ path: "/live/live", query: { username: this.username } });
    }
  }
}
</script>

<style scoped>
</style>
