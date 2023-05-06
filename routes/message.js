const express = require("express")

const router = express.Router();

const messageController = require("../controllers/message")
const authMiddleWare = require("../middlewares/auth")

router.post("/message/send", authMiddleWare.authenticate, messageController.postSentMessage);
router.get("/message/getall", authMiddleWare.authenticate, messageController.getAllMessage);

module.exports = router;