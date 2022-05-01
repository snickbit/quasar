import SContainer from '../../../src/components/SContainer.vue'

export default {
	component: SContainer,
	title: 'Components/Layout/Container'
}

export const Basic = {
	render: () => ({
		components: {SContainer},
		template: '<s-container>SContainer</s-container>'
	})
}
