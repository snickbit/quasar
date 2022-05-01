import {QInput} from 'quasar'
import {ref} from 'vue'
import SCopyButton from '../../src/components/SCopyButton.vue'

export default {
	component: SCopyButton,
	title: 'Components/CopyButton'
}

const Template = (args) => ({
	components: {SCopyButton, QInput},
	setup() {
		const content = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quisquam.')
		return {args, content}
	},
	template: `
		<s-copy-button :content="content"/>
		<q-input v-model="content" type="textarea" outlined></q-input>
		<q-input type="textarea" outlined></q-input>
	`
})

export const Basic = Template.bind({})
Basic.args = {src: 'placeholder-md.jpg', expandSrc: 'placeholder-xl.jpg'}
