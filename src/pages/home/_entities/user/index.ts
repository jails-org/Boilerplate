
export const User = ({

	id = Number(),
	name = String(),
	email = String(),
	address = Object()

}) => ({
	id : String(id),
	name,
	email,
	address : UserAddress( address )
})


export const UserAddress = ({

	street 	= String(),
	suite 	= String(),
	city 	= String(),
	zipcode = String()

}) => {
	return `${street}, ${city}. ${suite} - ${zipcode}`
}
