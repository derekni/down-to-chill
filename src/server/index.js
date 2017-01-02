import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import apiRouter from './apiRouter'
import authRouter from './authRouter'
import bluebird from 'bluebird'
import expressSession from 'express-session'
import passport from 'passport'
import { dbuser, dbpassword } from '../../secrets'

mongoose.Promise = bluebird
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds145118.mlab.com:45118/down-to-chill`)

const app = express()

app.use(bodyParser.json())
app.use(expressSession({ secret: 'asdf '}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', express.static('public'))
app.use('/build', express.static('build'))
app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.route('/test')
	.get((req, res) => {
		res.send('test')
	})

const server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address
  host = (host === '::' ? 'localhost' : host)
  const port = server.address().port

  console.log(`listening at http://${host}:${port}`)
})
