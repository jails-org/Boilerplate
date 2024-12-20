
/**
 * Gets an <script type="text/third-party" data-name="analytics"> element by name and
 * returns a Promise that will be resolved after script load and execute inline text script.
 * @usage
 * 		const analytics = thirdParty('analytics')
		analytics.then( _ => window.gtag('event', 'buy_click', {...})
 */
		export const thirdParty = (name) => {

			return new Promise((resolve, reject) => {
				const script: HTMLScriptElement = document.querySelector(`script[data-name=${name}]`)
				if (!script) {
					reject(`[ThirdParty] -> script for data-name="${name}" not found.`)
				} else {
					if( script.src ) {
						const newscript = document.createElement('script')
						newscript.onload = () => {
							eval( script.text )
							resolve( newscript )
						}
						newscript.src = script.src
						document.head.appendChild(newscript)
					}else {
						eval(script.text)
						resolve(script)
						console.info(`[ThirdParty] ${name} - Finished execution`)
					}
				}
			})
		}
