<template>
  <div class="container">
    <div class="center">
      <div class="inner">
        <div id="dplayer"></div>
      </div>
    </div>
    <div class="right">
      <div class="list">
        <div class="commen" v-for="item,index in danmakus" :key="index">
          <t-dropdown :options="options" :max-column-width="120" :max-height="200" @click="clickHandler(item)">
              <div class="user" >{{ item.user }}</div> <span>：</span>
              <template #suffix><chevron-down-icon size="16" /></template>
          </t-dropdown>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
      <div class="input">
        <t-textarea placeholder="请输入正当言论" 
        :maxlength="20" v-model="text"
        :autosize="{ minRows: 3, maxRows: 5 }"
        show-limit-number></t-textarea>
        <t-button @click="send()">发送</t-button>
      </div>
    </div>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
import createRTC from '../utils/basicVoiceCall'
import AgoraRTC from 'agora-rtc-sdk-ng'
export default {
  name: "Live",
  data() {
    return {
      dp: null,
      danmakus: [
        {text: "测试弹幕数据", user: "MaryLi"},
        {text: "测试弹幕数据很长很长的弹幕🥚🐤", user: "zebing"},
        {text: "测试弹幕数据", user: "okfang"},
        {text: "测试弹幕数据", user: "yupeng"},
      ], // 存储评论数据
      socket: null,
      filmContent: {
        userId: "12345",
        movieId: "hello",
      },
      text: "",
      user: "zebing",
      options: [
        {
          content: '申请连麦',
          value: 1,
        },
      ],
      rtc: null,


      appid: '5c80a256c23d4d7b8de8eb500a3abc3f', // appId
      token: "007eJxTYLCZU7pvidw0Ptd0cdlNFvUS4k9/qC5TTzn+6Xhp4buS/bIKDKbJFgaJRqZmyUbGKSYp5kkWKakWqUmmBgaJxolJycZp7TvnpjQEMjKYREkzMzJAIIjPwlCSWlzCwAAA+h4enQ==", // 根据房间号生成的token(房间号和token对应)
      channel: 'test', // 房间号(房间号和token对应)
      uid: null,
      agoraClient: null, // 实例
      localTracks: {  // 信道
        audioTrack: null
      },
      remoteUsers: {},
      callState: null,



      // options: {
      //     // Pass your App ID here.
      //     appId: "5c80a256c23d4d7b8de8eb500a3abc3f",
      //     // Set the channel name.
      //     channel: "test",
      //     // Pass your temp token here.
      //     token: "007eJxTYLCZU7pvidw0Ptd0cdlNFvUS4k9/qC5TTzn+6Xhp4buS/bIKDKbJFgaJRqZmyUbGKSYp5kkWKakWqUmmBgaJxolJycZp7TvnpjQEMjKYREkzMzJAIIjPwlCSWlzCwAAA+h4enQ==",
      //     // Set the user ID.
      //     uid: this.user
      // }
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      const vm = this;
      vm.socket = new WebSocket(`ws://121.57.172.145:1234/danmaku`);
      // 实时推送弹幕
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),
        live: true,
        danmaku: true,
        autoplay: true,
        apiBackend: {
          read: function (options) {
            console.log("Pretend to connect WebSocket");
            vm.socket.onmessage = (event) => {
              const message = JSON.parse(event.data);
              console.log(message);
              const danmakuItem = {
                color: message.color,
                time: message.time / 1000, // 将时间戳转换为相对于视频的时间
                style: {
                  width:"100px",
                  height:"20px"
                }, // 弹幕样式
                removed: false, // 是否已被移除
                ...message
              };
              vm.danmakus.push(danmakuItem);
              vm.dp.danmaku.draw(danmakuItem); // 绘制弹幕
              vm.startAnimation(danmakuItem); // 开始弹幕滚动动画
            };
            options.success([]);
          },
          // send: function (options) {
          //   this.send(options)
          // },
        },
        video: {
          url: "http://121.57.172.145:7001/live/L17LTlsVqMNTZyLKMIFSD2x28MlgPJ0SDZVHnHJPxMKi0tWx.flv",
          type: "flv",
        },
      });
    },
    send() {
      const danmaku = {
        text: this.text,
        user: this.user
      }
      this.socket.send(JSON.stringify(danmaku));
      this.text = ""
    },
    async clickHandler(data) {
      this.$message.success(`${data.user} data`)
      this.sharRTC()
      this.join()
    },
    // 通话 开始 ==================================
    sharRTC () {
      // 创建本地客户端 AgoraRTC 的实例
      this.agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
      console.log(this.agoraClient);
      // 用户信息
      this.uid = this.user
    },
    // 获取
    async join () {
      // 添加事件侦听器以在远程用户发布时播放远程曲目.
      this.agoraClient.on('user-published', this.handleUserPublished)
      this.agoraClient.on('user-unpublished', this.handleUserUnpublished)
      this.agoraClient.on('connection-state-change', this.getState)
      // 加入频道
      Promise.all([
        // join the channel
        this.agoraClient.join(this.appid, this.channel, this.token || null),
        // 使用麦克风
        AgoraRTC.createMicrophoneAudioTrack()]).then(async(result) => {
          console.log('使用麦克风=======', result)
          this.uid = result[0]
          this.localTracks.audioTrack = result[1]
          // 将本地曲目发布到频道
          await this.agoraClient.publish(Object.values(this.localTracks))
        }).catch((error) => {
          console.log(error)
        })
    },
    handleUserPublished (user, mediaType) {
      console.warn(user, mediaType);
      const id = user.uid
      this.remoteUsers[id] = user
    },
    handleUserUnpublished (user) {
      const id = user.uid
      delete this.remoteUsers[id]
    },
    async subscribe (user, mediaType) {
      const uid = user.uid
      // 订阅远程用户
      await this.agoraClient.subscribe(user, mediaType)
      console.warn(mediaType);
      user.audioTrack.play()
      if (mediaType === 'audio') {
      }
    },
    // 获取当前通话状态
    getState (state) {
      this.callState = state
    },
    // 客户离开信道
    async Leave () {
      if (this.callState === 'CONNECTING' || this.callState === 'CONNECTED' || this.callState === 'RECONNECTING') {
        this.localTracks.audioTrack && this.localTracks.audioTrack.stop()
        this.localTracks.audioTrack && this.localTracks.audioTrack.close()
        this.agoraClient && await this.agoraClient.leave()
        this.remoteUsers = {}
        console.log('客户离开信道成功==============')
      }
    }
  }
}
</script>

<style scoped>
.container {
  overflow: hidden;
  height: calc(100vh - 120px);
  border: 1px solid rgb(227, 229, 231);
}
.center {
  float: left;
  width: 100%;
  height: 100%;
}
.inner {
  margin: 0px 200px 0 0;
  height: 100%;
  background-color: green;
  display: flex;
  flex-direction: column;
}
.inner .dplayer {
  flex: 1;
}
.right {
  float: left;
  margin-left: -200px;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(246, 247, 248);
}
.right .list {
  flex: 1;
}
.right .input {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
}

.list {
  overflow-y: scroll;
  padding: 10px 5px;
}
.commen {
  display: flex;
  margin-top: 5px;
}
.user {
  cursor: pointer;
  padding: 2px;
  min-width: 50px;
}
</style>
