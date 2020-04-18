import style from './index.css'
import { WebComponent, html, map } from '../webcomponent'

export default class HelloWorld extends WebComponent {

	static get observedAttributes(){
		return ['image']
	}

	onMount(){
		const slot  = this.slot
		const image = this.getAttribute('image')
		this.setState({ image, slot })
	}

	render({ image, slot }, attrs){
		const items = [1, 2, 3]
		return html`
			<style>${style}</style>
			<section class="hello-world">
				<div class="hello-world__content">
					<img class="logo" src="${image}" />
					<h1>Hello World</h1>
					${ slot }
					<h4>Iteration example</h4>
					<ul>
						${ map(items, i => html`<li>${i}</li>`) }
					</ul>
				</div>
			</section>
		`
	}
}
