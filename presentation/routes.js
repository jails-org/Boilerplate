export default async ({ APIS }) => {

	return [
		{
			app: 'home',
			path:'/',
			file: 'index.html',
			title: 'Home',
			params: { isHome: true }
		},
		{
			app: 'about',
			path: '/about',
			file: 'about/index.html',
			title: 'About',
			params: { isAbout: true }
		},
		{
			app: 'sample',
			path: '/react-example',
			file: 'react-example/index.html',
			title: 'React Example',
			params: { isSample: true }
		}
	]
}

