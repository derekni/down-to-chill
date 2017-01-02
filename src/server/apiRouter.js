import express from 'express'
import User from './user'

const router = express.Router()

let chilling = false

router.route('/')
	.get((req, res) => {
		res.send('this is the api')
	})

router.route('/chill')
	.get((req, res) => {
		// res.json({ chilling: chilling })
		User.findById(req.user.id)
			.exec()
			.then((user) => {
				res.json({ chilling: user.chilling })
			})
	})
	.post((req, res) => {
		// chilling = !chilling
		// res.json({ chilling: chilling })
		User.findById(req.user.id)
			.exec()
			.then((user) => {
				user.chilling = !user.chilling
				return user.save()
			})
			.then((newUser) => {
				res.json({ chilling: newUser.chilling })
			})
	})

router.route('/user')
	.get((req, res) => {
		User.find()
			.exec()
			.then((users) => {
				res.json(users)
			})
			.catch((err) => {
				res.sendStatus(404)
			})
	})
	.post((req, res) =>{
		const {
			name,
			chilling,
		} = req.body

		const user = new User({
			name: name,
			chilling: chilling,
		})

		user.save()
			.then((newUser) => {
				res.sendStatus(201)
			})
			.catch((err) => {
				res.sendStatus(500)
			})
	})

export default router
