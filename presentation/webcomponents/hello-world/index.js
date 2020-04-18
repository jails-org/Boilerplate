import style from './index.css'

export default class HelloWorld extends HTMLElement {

	constructor(){
		super()
		// this.root = this.attachShadow({ mode: 'open' })
	}

	connectedCallback(){

		const slot = this.querySelector('slot')

		this.image = this.getAttribute('image')
		this.slot = slot ? slot.innerHTML : ''

		this.setState({
			image 	: this.image,
			slot 	: this.slot
		})
	}

	setState( data ){
		this.innerHTML = this.render( data )
	}

	render({ image, slot }){

		return `
			<style>${style}</style>
			<section class="hello-world">
				<div class="hello-world__content">
					<img class="logo" src="${image}" />
					<h1>Hello World</h1>
					${slot}
				</div>
			</section>
		`
	}
}
