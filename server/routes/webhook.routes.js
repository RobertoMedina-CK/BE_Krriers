import { Router } from "express";

const router = Router();

router.post("/webhook", (req, res) => {
  const url = "https://hook.us1.make.com/g3f3chvgvhv0ali6g6jp68am5tuu7p8a";
  const texto = {
    username: "Webhook",
    avatar_url: "https://i.imgur.com/4M34hi2.png",
    content: "Text message. Up to 2000 characters.",
  };
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(texto),
  }).then((response) => {
    console.log(response);
  });
});

router.post("/whatsappFile", (req, res) => {
  const body = req.body;

  const params = {
    Bucket: spacesDO.spaceName,
    Key: body.fileName,
    Expires: 60 * 3, // Expires in 3 minutes
    ContentType: body.fileType,
    ACL: "public-read", // Remove this to make the file private
  };

  const signedUrl = spaces.getSignedUrl("putObject", params);

  res.json({ signedUrl });
});

export default router;
