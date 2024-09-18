import { Router } from "express";
import { uploadFile, getFiles, downloadFile, getFileURL } from "../s3.js";

const router = Router();

router.get("/files", async (req, res) => {
  const result = await getFiles();
  res.json(result.Contents);
});

router.get("/files/:fileName", async (req, res) => {
  const result = await getFileURL(req.params.fileName);
  res.json({
    url: result,
  });
});

router.get("/downloadfile/:fileName", async (req, res) => {
  await downloadFile(req.params.fileName);
  res.json({ message: "archivo descargado" });
});

router.post("/files", async (req, res) => {
  console.log(req.files);
  const result = await uploadFile(req.files.file);
  console.log(result)
  res.json({ result });
});

export default router;
