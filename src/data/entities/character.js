
/** @type {Character} */
export const Character = ({

	id 		 = Number(),
	name 	 = String(),
	status 	 = String(),
	url 	 = String(),
	species  = String(),
	type	 = String(),
	gender 	 = String(),
	image	 = String(),
	created  = String(),
	episode	 = Array(),
	origin 	 = Object(),
	location = Object()

} = {} ) => ({
	id,
	name,
	status,
	url,
	species,
	type,
	gender,
	origin,
	location,
	image,
	episode,
	created
})
