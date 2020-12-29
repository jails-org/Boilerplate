import name_ from 'rv-utils/build/validators/name'
import email_ from 'rv-utils/build/validators/email'

export const required = ({ value, data, fields }) => {
	return Boolean(value.trim())
}

export const name = ({ value, data, fields }) => {
	return name_(value)
}

export const email = ({ value, data, fields }) => {
	return email_(value)
}

export const minAge = ({ value, data, fields }) => {
	return Number(value) >= data
}
