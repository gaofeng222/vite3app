<template>
  <div>
    <h1>Upload File</h1>
    <div>
      <form method="POST" enctype="multipart/form-data">
        <input ref="fileInput" type="file" @change="uploadHandleFile" />
        <el-button @click="handleUpload">上传</el-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadFileApi, mergeChunks } from "../api/upload.js";

const fileInput = ref(null);
let uploadFile = ref(null);
const uploadChunkList = ref([]);
const uploadHandleFile = e => {
  const files = fileInput.value.files[0];
  uploadFile.value = files;
};
const handleUpload = () => {
  if (!uploadFile.value) return;
  const chunkList = createChunk(uploadFile.value);
  // 另外切片需要打上标记，保证后端正确合并
  uploadChunkList.value = chunkList.map(({ file }, index) => {
    return {
      file,
      size: file.size,
      percent: 0,
      chunkName: `${uploadFile.value.name}-${index}`,
      fileName: uploadFile.value.name,
      index
    };
  });
  // 开始上传
  uploadChunks();
};

const createChunk = (file, chunkSize = 1024 * 1024) => {
  const chunkList = [];
  let cur = 0;
  while (cur < file.size) {
    chunkList.push({ file: file.slice(cur, cur + chunkSize) });
    cur += chunkSize;
  }
  return chunkList;
};
const uploadChunks = async () => {
  const formateLists = uploadChunkList.value.map((chunk, index) => {
    const formData = new FormData();
    formData.append("file", chunk.file);
    formData.append("chunkName", chunk.chunkName);
    formData.append("fileName", chunk.fileName);
    return { formData, index };
  });
  console.log(formateLists, "formateLists");
  const requestLists = formateLists.map(item => {
    return uploadFileApi(item.formData);
  });
  console.log("🚀 ~ requestLists ~ requestLists:", requestLists);
  await Promise.all(requestLists);
  mergeApiChunks();
};
function mergeApiChunks() {
  mergeChunks({ fileName: uploadFile.value.name, size: 2 * 1024 * 1024 });
}
</script>

<style></style>;
