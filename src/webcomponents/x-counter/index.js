import { WebComponent } from '../index'

export default class Counter extends WebComponent {

	onMount(){

		const button  = this.querySelector('[data-button]')
		const value   = this.querySelector('[data-value]')
		const counter = Number( value.textContent )

		button.addEventListener('click', this.onClick({ value, counter }))
	}

	onClick({ value, counter }){
		return (e) => {
			counter += 1
			value.textContent = counter
		}
	}
}
