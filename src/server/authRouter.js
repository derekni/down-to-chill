import express from 'express'
import passport from 'passport'
import passportFacebook from 'passport-facebook'
import User from './user'
import { clientID, clientSecret } from '../../secrets'


const FacebookStrategy = passportFacebook.Strategy
passport.use(new FacebookStrategy({
	clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: '/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id })
    	.exec()
    	.then((user) => {
    		if (user) {
    			return user
    		}
    		const newUser = new User({
    			name: profile.displayName,
    			chilling: false,
    			facebookId: profile.id,
    		})
    		return newUser.save()
    	}).then((user) => {
    		done(null, user)
    	}).catch((err) => {
    		done(err)
    	})
 }))

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id)
		.exec()
		.then((user) => {
			done(null, user)
		})
		.catch((err) => {
			done(err)
		})
})

const router = express.Router()

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/',
}))

router.get('/user', (req, res) => {
	if (req.user === undefined) {
		res.json(null)
	} else {
		res.json({ user: req.user })
	}
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

export default router
