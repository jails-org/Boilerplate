export default async ({ APIS }) => {

	return [
		{
			page: 'home',
			path:'/',
			file: 'index.html',
			title: 'Home',
			params: { isHome: true }
		},

		{
			page: 'about',
			path: '/about',
			file: 'about/index.html',
			title: 'About',
			params: { isAbout: true }
		},

		{
			page: 'form-example',
			path:'/form-example',
			file: 'form-example/index.html',
			title: 'Form Example',
			params: { isFormExample: true }
		}
	]
}

