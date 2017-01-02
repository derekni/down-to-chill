import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	chilling: {
		type: Boolean,
		required: true,
	},
	facebookId: {
		type: String,
		// required: true,
	}
})

const User = mongoose.model('User', userSchema)

export default User
