import { getUsers } from '../../_services/users'
import { Swiper } from 'swiper'
import { animation } from './utils/animation'

export default async function helloWorld ({ main, elm, on, state }) {

	const wrapper = elm.querySelector('.swiper')
	const canvas = elm.querySelector('canvas')
	const { checking, numLook, handsUp, trigSuccess } = await animation( canvas )
	const swiper = new Swiper(wrapper, { allowTouchMove: false })

	let formData = {}

	main( _ => {

		on('input', 'input[type="text"]', ontextchange)
		on('focus', 'input[type="text"]', ontextfocus)
		on('focus', 'input[name="password"]', onPasswordFocus)
		on('blur', 'input[name="password"]', onPasswordBlur)
		on('click', 'button[data-reset]', onReset)
		on('click', '[data-prev]', prev)
		on('form-validation:submit', 'form', submit)

		swiper.on('transitionEnd', onslidechange)

		getUsers().then( users => state.set({ users }) )

	})

	const ontextchange = (e) => {
		const num = e.target.value.length
		numLook.value = num * 1.6
	}

	const ontextfocus = (e) => {
		checking.value = true
	}

	const onPasswordFocus = (e) => {
		handsUp.value = true
	}

	const onPasswordBlur = (e) => {
		handsUp.value = false
	}

	const onReset = (e) => {
		checking.value = false
	}

	const onslidechange = (swiper) => {
		const index = swiper.activeIndex
		const current = swiper.slides[index]
		const input = current.querySelector('input,select,textarea')
		input.focus()
	}

	const submit = (e, { data }) => {
		console.log( e, data, formData )
		formData = {...formData, ...data }
		if( e.delegateTarget.finish ) {
			send()
		} else {
			swiper.slideNext()
		}
	}

	const prev = () => {
		swiper.slidePrev()
		state.set({ success: null })
	}

	const send = () => {
		state.set({ success: true, formData })
			.then( _ => elm.querySelectorAll('form') )
		setTimeout( _ => trigSuccess.fire(), 2000 )
	}
}

export const model = {
	users: null,
	success: null,
	formData: null
}
