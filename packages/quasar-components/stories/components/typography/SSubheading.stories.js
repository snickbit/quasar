import SSubheading from '../../../src/components/SSubheading.js'

export default {
	component: SSubheading,
	title: 'Components/Typography/SSubheading',
	parameters: {
		docs: {
			source: {
				code: '<s-subheading>...</s-subheading>'
			}
		}
	}
}

export const Basic = {
	render: () => ({
		components: {SSubheading},
		template: '<s-subheading>SSubheading</s-subheading>'
	})
}
