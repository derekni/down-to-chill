import axios from 'axios'
import React, { Component } from 'react'

class ChillStatus extends Component {
	constructor(props) {
		super(props)

		this.state = { chilling: false }

		this.initializeState()
	}

	initializeState() {
		axios.get('/api/chill')
			.then((response) => {
				this.setState(response.data)
			})
	}

	onClick() {
		axios.post('/api/chill')
			.then((response) => {
				this.setState(response.data)
			})
	}

	render() {
		const { chilling } = this.state

		const descriptionText = chilling ? "I'm chilling right now" : "I'm not chilling right now"
		const buttonText = chilling ? "I want to stop chilling" : "I want to chill"

		return (
			<div>
				<p>{ descriptionText }</p>
				<button onClick={() => this.onClick()}>{ buttonText }</button>
				<a href="/auth/logout">Logout</a>
			</div>
		)
	}
}

export default ChillStatus
