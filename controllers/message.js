const User = require("../models/user")
const Message = require("../models/message")
const sequelize = require("../utils/database")
const jwt = require("jsonwebtoken")

exports.postSentMessage = async (req, res, next) => {
	const msg = req.body.message;
	const name = req.body.name;

	try {
		//console.log(req.user)
		await req.user.createMessage({
			message: msg,
			name: name
		})

		res.json({ sucess: true, message: "message posted successfully." })
	} catch (err) {
		console.log(err)
		res.json({ success: false })
	}
}

exports.getAllMessage = async (req, res, next) => {
	try {
		const messages = await Message.findAll()
		res.json(messages)
	} catch (err) {
		console.log(err)
		res.status(500).json({ success: false, message: "Internal server error" })
	}
}
