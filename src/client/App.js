import React, { Component } from 'react'
import axios from 'axios'
import ChillStatus from './ChillStatus'
import Login from './Login'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loggedIn: false
		}

		this.initializeState()
	}

	initializeState(){
		axios.get('/auth/user')
			.then((response) => {
				if (response.data !== null) {
					this.setState({ loggedIn: true })
				}
			})
	}

	render() {
		const { loggedIn } = this.state
		const BodyComponent = loggedIn ? ChillStatus : Login
		console.log(loggedIn)

		return (
			<div>
				<h1>Down to Chill</h1>
				<BodyComponent/>
			</div>
		)
	}
}

export default App
