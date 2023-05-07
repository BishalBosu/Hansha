const User = require("../models/user")
const Message = require("../models/message")
const sequelize = require("../utils/database")
const jwt = require("jsonwebtoken")
const { Sequelize } = require("sequelize")

exports.postSentMessage = async (req, res, next) => {
	const msg = req.body.message
	const name = req.body.name

	try {
		//console.log(req.user)
		await req.user.createMessage({
			message: msg,
			name: name,
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

exports.getNewMessages = async (req, res, next) => {
	try {
		const lastId = req.query.lastId;
		//console.log("lastId ", +lastId);
		const msgs = await Message.findAll({
			where: {
				id: {
					[Sequelize.Op.gt]: +lastId,
				},
			},
		})

		//sending only last 10 messages when there are more messages
		
		return res.json(msgs.slice(-10))
		

	} catch (err) {
		console.log(err)
		res.status(500).json({success: fasle, message:"Internal server error."})

	}
}
