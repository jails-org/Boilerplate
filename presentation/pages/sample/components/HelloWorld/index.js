import React from 'react'

export default function HelloWorld ({ visible, toggle }) {

	if (visible) {
		return <div className="App">
			<h1>Hello React!!!</h1>
			<h2>Start editing to see some magic happen!</h2>
		</div>
	} else {
		return <div className="App">
			<h1>Hi, Click below and see it working!</h1>
			<button className="btn btn-primary" onClick={toggle}>Click Me</button>
		</div>
	}
}
