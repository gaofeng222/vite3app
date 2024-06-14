const express = require("express");
const multiparty = require("multiparty");
const router = express.Router();
const path = require("path");
const fse = require("fs-extra");
const UPLOAD_DIR = path.resolve(__dirname, ".", "../upload"); // 准备好地址用来存切片
router.post("/", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }
    // 获取文件名
    const file = files.file[0];
    const fileName = fields.fileName[0];
    const chunkName = fields.chunkName[0];
    //准备好地址存放切片

    if (!fse.existsSync(UPLOAD_DIR)) {
      // 判断目录是否存在
      fse.mkdirsSync(UPLOAD_DIR);
    }
    fse.moveSync(file.path, `${UPLOAD_DIR}/${chunkName}`, { overwrite: true });
    // 判断是否是最后一个切片
    res.status(200).send({
      message: "success",
      code: 0,
    });
  });
});

router.post("/merge", async (req, res) => {
  console.log("🚀 ~ router.post ~ req:", req);
  // 获取文件名
  const body = req.body;
  console.log("🚀 ~ router.post ~ body:", body);
  const { fileName, size } = body;
  await mergeFileChunks(UPLOAD_DIR, fileName, size);
  return res.status(200).send({
    message: "success",
    code: 0,
  });

  // 获取文件名
});

const mergeFileChunks = async (filePath, filename, size) => {
  // 读取filePath下所有的切片
  const chunks = await fse.readdir(filePath); // 读文件夹的所有文件
  let chunksLists = chunks.filter((ele) => ele.includes(filename));
  chunksLists.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  console.log(chunksLists);

  //合并文件
  const arr = chunksLists.map((chunkPath, index) => {
    return pipeStream(
      path.resolve(filePath, chunkPath),
      fse.createWriteStream(
        // 合并地点
        path.resolve(filePath, filename),
        {
          start: index * size,
          end: (index + 1) * size,
        }
      )
    );
  });
};

const pipeStream = (filePath, writeStream) => {
  console.log(filePath);
  return new Promise((resolve, reject) => {
    const readStream = fse.createReadStream(filePath);
    readStream.on("end", () => {
      fse.unlinkSync(filePath); // 移除切片
      resolve();
    });
    readStream.pipe(writeStream); // 将切片读成流汇入到可写流中
  });
};

module.exports = router;
