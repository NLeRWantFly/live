<template>
  <div>
    <t-layout>
      <h1 class="title">雪课堂</h1>
      <t-layout>
        <t-content style="display: flex">
          <div id="dplayer" style="width: 80%; border: 1px solid black; border-radius: 10px"></div>
          <div>
            <div style="font-weight: 600; font-size: 20px; text-align: center">视频分栏</div>
            <div v-for="tag in tagArr" :key="tag.id">
              {{ tag.videoName }}
              <t-button @click="changeVideo(tag.videoName)">切换视频</t-button>
            </div>
          </div>
        </t-content>
      </t-layout>
      <t-footer>
        <div style="margin-top: 20px">
          <h3>评论区</h3>
          <div v-for="comment in comments" :key="comment.id">
            {{ comment.text }}
          </div>
          <t-input v-model="newComment" placeholder="请输入评论"></t-input>
          <t-button click="addComment">发送评论</t-button>
        </div>
      </t-footer>
    </t-layout>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
import { videoFindByTag, videoAddComment, findCommentByVid } from "../api/secret.js";

export default {
  name: "video",
  data() {
    return {
      tagArr: [],
      dp: null,
      comments: [],
      newComment: ""
    }
  },
  mounted() {
    this.init();
    this.getTag();
    this.loadComments();
  },
  methods: {
    init() {
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        video: {
          url: 'http://localhost:8080/file/video/2022-12-16%2016-14-45.mkv',
        },
      });
      this.dp = dp;
    },
    getTag() {
      videoFindByTag("高等数学").then(res => {
        console.log(res)
        this.tagArr = res.data
      });
    },
    changeVideo(videoName) {
      this.dp.switchVideo({
        url: `http://localhost:8080/file/video/${videoName}.mp4`
      });
    },
    addComment() {
      if (this.newComment.trim() !== "") {
        const comment = {
          id: this.comments.length + 1,
          text: this.newComment
        };

        // Save comment to the backend
        videoAddComment("1674529733289967617", "123456", this.newComment)
          .then(res => {
            console.log(res);
            this.newComment = "";

            // Reload comments
            this.loadComments();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    loadComments() {
      // Fetch comments from the backend
      findCommentByVid("1674529733289967617")
        .then(res => {
          console.log(res);
          this.comments = res.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style scoped>
.title {
  font-family: Arial, sans-serif;
  color: #333;
  font-size: 24px;
  text-align: center;
  margin: 0;
  padding: 16px 0;
}
</style>
