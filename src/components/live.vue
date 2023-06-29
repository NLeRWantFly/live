<template>
  <div style="display: flex">
    <div id="dplayer" style="width: 60vw;height: 70vh;border: 1px solid black">

    </div>
    <div style="width: 20vw;height: 70vh;border: 1px solid black"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import DPlayer from 'dplayer';

export default {
  name: "Live",
  mounted() {

  },
  methods:{

  }
}
</script>

<style scoped>
#dplayer {
  width: 100%;
  height: 100%;
}
</style>
