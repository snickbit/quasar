import SHeading from '../../../src/components/SHeading.vue'

export default {
	component: SHeading,
	title: 'Components/Typography/SHeading',
	args: {
		leftHeading: false,
		rightHeading: false
	},
	argTypes: {
		size: {
			type: 'select',
			options: [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6'
			]
		}
	},
	parameters: {
		docs: {
			source: {
				code: '<s-heading>...</s-heading>'
			}
		}
	}
}

const Template = (args) => ({
	components: {SHeading},
	setup() {
		return {args}
	},
	template: `
		<s-heading v-bind="args">
		<template #leftHeading v-if="args.leftHeading">
			Left Heading
		</template>
		S-Heading
		<template #rightHeading v-if="args.rightHeading">
			Right Heading
		</template>
		</s-heading>
	`
})

export const Basic = Template.bind({})

export const WithLeftHeading = Template.bind({})
WithLeftHeading.args = {
	leftHeading: true
}

export const WithRightHeading = Template.bind({})
WithRightHeading.args = {
	rightHeading: true
}

export const WithBothHeadings = Template.bind({})
WithBothHeadings.args = {
	leftHeading: true,
	rightHeading: true
}
