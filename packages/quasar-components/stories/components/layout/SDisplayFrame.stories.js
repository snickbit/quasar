import SDisplayFrame from '../../../src/components/SDisplayFrame.vue'

export default {
	component: SDisplayFrame,
	title: 'Components/Layout/SDisplayFrame',
	args: {
		heading: false,
		nonExpandable: false
	},
	parameters: {
		docs: {
			source: {
				code: '<s-display-frame>...</s-display-frame>'
			}
		}
	}
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra mi est, vel dictum massa eleifend et.'

const Template = (args) => ({
	components: {SDisplayFrame},
	setup() {
		return {args}
	},
	template: `
		<s-display-frame v-bind="args" :heading="args.heading ? 'Heading' : undefined">
		<template #description v-if="args.description">
			Description
		</template>
		${lorem}
		</s-display-frame>`
})

export const Basic = Template.bind({})
Basic.parameters = {}
