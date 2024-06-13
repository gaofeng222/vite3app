const express = require("express");
const multiparty = require("multiparty");
const router = express.Router();
const path = require("path");
const fse = require("fs-extra");

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
    console.log(file, fileName, chunkName);

    //准备好地址存放切片
    const UPLOAD_DIR = path.resolve(__dirname, ".", "../upload"); // 准备好地址用来存切片
    if (!fse.existsSync(UPLOAD_DIR)) {
      // 判断目录是否存在
      fse.mkdirsSync(UPLOAD_DIR);
    }
    fse.moveSync(file.path, `${UPLOAD_DIR}/${chunkName}`);
    // 判断是否是最后一个切片
    const isLast = fields.isLast[0] === "true";

    res.status(200).send({
      message: "success",
      code: 0,
    });
  });
});

module.exports = router;
