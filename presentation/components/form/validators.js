
export const required = ({ value, data, fields }) => {
	return Boolean(value.trim())
}

export const name = ({ value, data, fields }) => {
	return value.split(/\s/).length > 2
}

export const email = ({ value, data, fields }) => {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
}

export const minAge = ({ value, data, fields }) => {
	return Number(value) >= data
}
