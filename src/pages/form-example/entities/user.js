
/** @type {User} */
export const User = ({

	id 	  = Number(),
	email = String(),
	name  = String(),
	phone = String()

}) => ({
	id,
	email,
	name,
	phone
})
