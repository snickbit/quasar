import {createStore, useStore} from '@snickbit/minia'
import {isEmpty, isObject, isString, objectFilter, overloadOptions} from '@snickbit/utilities'

export function createForm(...args) {
	let {name, options, fields} = overloadOptions(args, [
		{name: 'string', options: 'object', items: 'array'},
		{options: 'object', items: 'array'},
		{options: 'object'},
		{items: 'array'}
	])
	if (isEmpty(fields)) fields = []
	if (!name) name = 'default'
	if (!options) options = {}
	const {actions, getters, ...rest} = options

	return createStore(
		`form-${name}`,
		{
			getters: {
				data() {
					const output = {}
					for (let [field_name, field] of Object.entries(this.$state.fields)) {
						output[field_name] = field.value
					}
					return output
				},
				...getters
			},
			actions: {
				addField(name, type, defaultValue) {
					if (isObject(name)) ({name, type, defaultValue} = name)
					if (!isString(name)) throw new Error('Field name must be a string')
					if (!isString(type)) throw new Error('Field type must be a string')
					if (!isEmpty(this.$state.fields[name])) throw new Error(`Field ${name} already exists`)
					this.$state.fields[name] = {
						name,
						type,
						value: defaultValue || '',
						valid: true,
						error: false
					}
				},
				addFields(...fields) {
					for (let field of fields) {
						this.addField(field.name, field.type, field?.defaultValue || field?.value)
					}
				},
				getField(fieldName) {
					try {
						return this.$state.fields[fieldName]
					} catch (e) {
						return undefined
					}
				},
				setValue(fieldName, value) {
					this.$state.fields[fieldName].value = value
				},
				validate(field_name) {
					const data = this.data()
					if (field_name) {
						const field = this.getField(field_name)
						const value = data[field_name]
						let results = true
						if (field.validate) {
							results = field.validate(field.value, data)
						} else if (field.required && (value === '' || value === null || value === undefined)) {
							results = 'This field is required'
						}

						if (results === true) {
							this[field_name].error = false
							return true
						} else {
							this[field_name].error = results
							return results
						}
					} else {
						const field_names = Object.keys(this.$state)
						const results = {}
						for (let field_name of field_names) {
							results[field_name] = this.validate(field_name)
						}
						this.$state.valid = Object.values(results).every(result => result === true)
						if (!this.$state.valid) {
							this.$state.errors = objectFilter(results, result => isString(result))
						}
					}
					return this.$state.valid
				},
				...actions
			},
			...rest
		},
		{
			title: 'Default Form',
			errors: {},
			valid: true,
			...options,
			fields
		})
}

export function useForm(name = 'default') {
	return useStore(`form-${name}`)
}
