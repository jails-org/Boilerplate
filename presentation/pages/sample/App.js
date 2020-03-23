import React from 'react'
import { useState } from 'react'
import HelloWorld from './components/HelloWorld'

export default function App() {

	const [ visible, setVisible ] = useState( false )

	const toggle = () => {
		setVisible( !visible )
	}

	return <HelloWorld
		visible={visible}
		toggle={toggle}
	/>

}
