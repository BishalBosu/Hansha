const User = require("../models/user")
const Message = require("../models/message")
const sequelize = require("../utils/database")
const jwt = require("jsonwebtoken")

exports.postSentMessage = async (req, res, next) => {
	const msg = req.body.message

	try {
		//console.log(req.user)
		await req.user.createMessage({
			message: msg,
		})

		res.json({ sucess: true, message: "message posted successfully." })
	} catch (err) {
		console.log(err)
		res.json({ success: false })
	}
}
