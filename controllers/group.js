const Group = require("../models/group")
const Sequelize = require("sequelize")

exports.postCreateGroup = async (req, res, next) => {
	const user = req.user
	const gName = req.body.gName
	const gDesc = req.body.gDesc

	try {
		const group = await user.createGroup({
			group_name: gName,
			group_description: gDesc,
			creatorEmail: user.email,
		})

		res.json(group)
	} catch (err) {
		res.status(500).json({ success: false, message: "internal error" })
	}
}

exports.getAllGroups = async (req, res, next) => {
	try {
		const groups = await req.user.getGroups()
		res.json(groups)
	} catch (err) {
		res
			.status(500)
			.json({ success: false, messgae: "Internal error fetching groups." })
	}
}

exports.getGroupMessages = async (req, res, next) => {
	try {
		const groupId = req.params.groupId
		const group = await Group.findByPk(groupId)

		//checking for unautorized access
		if (!group.hasUser(req.user)) {
			//unauth code
			return res
				.status(401)
				.json({ success: false, message: "Unathorized access attempt!" })
		}

		const messages = await group.getMessages()

		res.json(messages)
	} catch (err) {
		console.log("getting group message error!", err)
		res.status(500).json({ success: false, message: "Internal server error!" })
	}
}

exports.getNewGroupMessages = async (req, res, next) => {
	try {
		const lastId = req.query.lastId;
		const groupId = req.params.groupId;


		const group = await Group.findByPk(groupId)

		//console.log("lastId ", +lastId);
		const msgs = await group.getMessages({
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
		res.status(500).json({success: false, message:"Internal server error."})

	}

}