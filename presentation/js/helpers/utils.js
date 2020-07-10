// @Functional
export const pipe = (fn, ...fns) => (...args) =>
	fns.reduce((acc, fn) => fn(acc), fn(...args))

// @Browser
export const isIE = () => {
	return !!window.navigator.userAgent.match(/Trident\/7\./)
}

// @Promises
export const delay = (time) => (data) => {
	return new Promise((resolve) => setTimeout(() => resolve(data), time))
}

export const retry = (fn, times, timeout = 250) => {
	const data = fn()
	return new Promise((resolve, reject) => {
		data
			? resolve(data)
			: (times <= 1)
				? reject('Retry fails to find data')
				: setTimeout(() => resolve(retry(fn, times - 1, timeout)), timeout)
	})
}

// @Events
export const prevent = e => {
	if (e && e.preventDefault)
		e.preventDefault()
	return e
}

export const debounce = (func, delay) => {

	let inDebounce

	return function () {
		const context = this
		const args = arguments
		clearTimeout(inDebounce)
		inDebounce = setTimeout(() => func.apply(context, args), delay)
	}
}

export const throttle = (func, limit) => {

	let inThrottle
	let lastFunc
	let lastRan

	return function () {
		const context = this
		const args = arguments
		if (!inThrottle) {
			func.apply(context, args)
			lastRan = Date.now()
			inThrottle = true
		} else {
			clearTimeout(lastFunc)
			lastFunc = setTimeout(function () {
				if ((Date.now() - lastRan) >= limit) {
					func.apply(context, args)
					lastRan = Date.now()
				}
			}, limit - (Date.now() - lastRan))
		}
	}
}

export const isVisible = (el, diff) => {
	const position = el.getBoundingClientRect(),
		elemTop = position.top + diff,
		elemBottom = position.bottom - diff
	return elemTop < window.innerHeight && elemBottom >= 0
}

export const observe = (elm, { keepAlive, intersectionRatio = 0 } = {}) => {
	return new Promise((resolve) => {
		if (window.IntersectionObserver) {
			const observer = new IntersectionObserver(entries => {
				entries.map((entry) => {
					if (entry.intersectionRatio > intersectionRatio) {
						resolve(elm)
						if (!keepAlive)
							observer.unobserve(entry.target)
					}
				})
			})
			observer.observe(elm)
		} else {
			const handler = throttle(() => {
				if (isVisible(elm, intersectionRatio)) {
					resolve(elm)
					if (!keepAlive)
						window.removeEventListener('scroll', handler)
				}
			}, 50)
			window.addEventListener('scroll', handler)
		}
	})
}

export const thirdParty = (name) => {
	return new Promise((resolve) => {
		const script = document.querySelector(`script[data-name=${name}]`)
		eval(script.text)
		resolve(script)
	})
}

export const thirdPartyIframe = (name) => {

	return new Promise((resolve) => {

		const handler = () => {

			const iframe = document.createElement('iframe')
			const script = document.createElement('script')
			const tp = document.querySelector(`script[data-name=${name}]`)

			script.text = `(function(window, document){ ${tp.text} })(parent.window, parent.window.document)`
			iframe.style.display = 'none'
			iframe.src = 'about:blank'

			document.body.appendChild(iframe)
			iframe.contentDocument.body.appendChild(script)

			resolve( iframe.contentWindow )

			window.removeEventListener('load', handler)
		}

		window.addEventListener('load', handler)
	})
}
