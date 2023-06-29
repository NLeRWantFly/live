<template>
  <div class="upload-page">
    <t-form :model="form" label-width="100px">
      <t-form-item label="选择文件">
        <t-upload ref="fileUpload" v-model="form.file" action="http://localhost:8080/fileUpload" accept="video/*" :limit="1">
          <t-button>选择文件</t-button>
        </t-upload>
      </t-form-item>

      <t-form-item label="标题">
        <t-input v-model="form.title" placeholder="请输入标题"></t-input>
      </t-form-item>

      <t-form-item label="标签">
        <t-input v-model="form.tags" placeholder="请输入标签"></t-input>
      </t-form-item>

      <t-form-item>
        <t-button type="primary" @click="submitForm">提交</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script>
import { videoUpload } from "../api/secret.js";

export default {
  data() {
    return {
      form: {
        file: [],
        title: '',
        tags: ''
      }
    };
  },
  methods: {
    submitForm() {
      if (this.form.file.length > 0) {
          videoUpload(this.form.title, this.form.tags)
            .then(res => {
              console.log(res);
            });
      } else {
        console.log("请选择文件");
      }
    }
  }
};
</script>

<style scoped>
.upload-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
