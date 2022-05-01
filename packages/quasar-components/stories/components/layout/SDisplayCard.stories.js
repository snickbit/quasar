import SDisplayCard from '../../../src/components/SDisplayCard.vue'

export default {
	component: SDisplayCard,
	title: 'Components/Layout/SDisplayCard',
	args: {
		square: false,
		flat: false,
		bordered: false,
		height: 'auto',
		padding: false,
		dark: null,
		fullscreen: false,
		noRouteFullscreenExit: false
	},
	parameters: {
		docs: {
			source: {
				code: '<s-display-card>...</s-display-card>'
			}
		}
	}
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra mi est, vel dictum massa eleifend et.'

const Template = (args) => ({
	components: {SDisplayCard},
	setup() {
		return {args}
	},
	template: '<s-display-card v-bind="args">' + lorem + '</s-display-card>'
})

export const Basic = Template.bind({})
Basic.parameters = {}

export const Bordered = Template.bind({})
Bordered.args = {
	bordered: true
}

export const Flat = Template.bind({})
Flat.args = {
	flat: true
}

export const Square = Template.bind({})
Square.args = {
	square: true
}
