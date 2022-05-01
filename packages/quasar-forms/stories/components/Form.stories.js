import {Notify} from 'quasar'
import {createForm} from '../../src'
import SForm from '../../src/components/SForm.vue'

export default {
	component: SForm,
	title: 'SForm',
	args: {
		name: 'register'
	},
	argTypes: {
		name: {
			control: {
				type: 'select'
			},
			options: [
				'register',
				'login',
				'contact'
			]
		}
	},
	parameters: {
		layout: 'centered',
		docs: {
			source: {
				code: '<s-form name="demo-form" reset @submit="onSubmit">...</s-form>'
			}
		}
	}
}

createForm('register', {
	username: {
		label: 'Username',
		required: true
	},
	email: {
		label: 'Email',
		required: true,
		type: 'email'
	},
	password: {
		label: 'Password',
		required: true,
		type: 'password'
	},
	password_confirmation: {
		label: 'Confirm',
		required: true,
		type: 'password',
		validate: (value, form) => {
			if (value !== form.password) {
				return 'Passwords do not match'
			}
		}
	},
	accept: {
		type: 'checkbox',
		label: 'I accept the {{terms and conditions}}',
		to: '/terms',
		required: true,
		value: false
	}
})

createForm('login', {
	username: {
		label: 'Username/Email',
		required: true
	},
	password: {
		label: 'Password',
		required: true,
		type: 'password'
	},
	remember: {
		type: 'checkbox',
		label: 'Remember me',
		value: false
	}
})

createForm('contact', {
	name: {
		label: 'Your Name',
		required: true
	},
	email: {
		label: 'Your Email',
		required: true,
		type: 'email'
	},
	message: {
		label: 'Message',
		required: true,
		type: 'textarea'
	}
})

const Template = (args) => ({
	components: {SForm},
	setup() {
		const onSubmit = (form) => {
			console.log('Form submitted', form)
			Notify.create({
				message: 'Form submitted',
				type: 'positive',
				position: 'top'
			})
		}
		return {args, onSubmit}
	},
	template: `
		<s-form reset v-bind="args"/>`
})

export const Basic = Template.bind({})
Basic.parameters = {
	name: 'register'
}
