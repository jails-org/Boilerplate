
/** Utils functions */

export const thirdParty = (name, timeout = 100) => {
	return new Promise((resolve, reject) => {
		const script = document.querySelector(`script[data-name=${name}]`)
		if(!script) {
			reject(`[ThirdParty] -> script for data-name="${name}" not found.`)
		}else {
			setTimeout( _ => {
				eval(script.text)
				resolve(script)
			}, timeout)
		}
	})
}
