const User = require("../models/user")
const Message = require("../models/message")
const Group = require("../models/group")
const sequelize = require("../utils/database")
const jwt = require("jsonwebtoken")
const { Sequelize } = require("sequelize")

//handle message sent with perticular group
exports.postSentMessage = async (req, res, next) => {
	const msg = req.body.message
	const name = req.body.name
	const groupId = req.body.groupid

	try {
		//console.log(req.user)
		await req.user.createMessage({
			messages: msg,
			name: name,
			groupId: groupId
			
		})

		res.json({ sucess: true, message: "message posted successfully." })
	} catch (err) {
		console.log(err)
		res.json({ success: false })
	}
}

//for perticular group
exports.getAllMessage = async (req, res, next) => {
	try {
		const groupId = req.params.groupid;
		const mainGroup = await Group.findByPk(groupId)
		const messages = await mainGroup.getMessages()
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
