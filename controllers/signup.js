const bcrypt = require("bcrypt")
const User = require("../model/user")

exports.postSignup = async (req, res, next) => {
	//transaction constant
	const t = await sequelize.transaction()

	const name = req.body.name
	const email = req.body.email
	const phone = req.body.phone
	const pass = req.body.pass
    try {
		bcrypt.hash(pass, 10, async (err, hash) => {
			if (err) console.log(err)
			const user = await User.create(
				{
					email: email,
					name: name,
					password: hash,
					phone: phone
					
				},
				{ transaction: t }
			)

			await t.commit()
			res.json(user)
		})
	} catch (err) {
		await t.rollback()
		//indicating conflict by 409
		res.status(409).json({err: err, message: "User may already exist", success: false})
	}
}