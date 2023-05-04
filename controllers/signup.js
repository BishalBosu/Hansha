const bcrypt = require("bcrypt")
const User = require("../models/user")
const sequelize = require("../utils/database")

exports.postSignup = async (req, res, next) => {
	try {
		//transaction constant
		const t = await sequelize.transaction()

		const name = req.body.name
		const email = req.body.email
		const phone = req.body.phone
		const pass = req.body.pass

		bcrypt.hash(pass, 10, async (err, hash) => {
			if (err) console.log(err)

			try {
				const user = await User.create(
					{
						email: email,
						name: name,
						password: hash,
						phone: phone,
						ispremium: false,
					},
					{ transaction: t }
				)

				await t.commit()
				res.json(user)
			} catch (err) {
				await t.rollback()
				//indicating conflict by 409
				res
					.status(409)
					.json({ err: err, message: "User may already exist", success: false })
			}
		})
	} catch (err) {
		await t.rollback()
		//indicating conflict by 409
		//res.status(409).json({err: err, message: "User may already exist", success: false})
		console.log("ssoutside hash signup.js", err)
	}
}
