import SImg from '../../src/components/SImg.vue'

export default {
	component: SImg,
	title: 'Components/Image',
	args: {
		src: 'placeholder-xs.jpg',
		expandSrc: 'placeholder-xl.jpg',
		fit: 'contain',
		ratio: '1',
		alt: 'Placeholder',
		icon: 'image',
		disableExpand: false,
		expandOnClick: true
	},
	argTypes: {
		src: {
			control: {
				type: 'inline-radio'
			},
			options: [
				'placeholder-xs.jpg',
				'placeholder-sm.jpg',
				'placeholder-md.jpg',
				'placeholder-lg.jpg',
				'placeholder-xl.jpg'
			]
		},
		expandSrc: {
			control: {
				type: 'inline-radio',
				defaultValue: 'placeholder-xl.jpg'
			},
			options: [
				'placeholder-xs.jpg',
				'placeholder-sm.jpg',
				'placeholder-md.jpg',
				'placeholder-lg.jpg',
				'placeholder-xl.jpg'
			]
		},
		ratio: {
			control: {
				type: 'inline-radio'
			},
			options: [
				'16/9',
				'4/3',
				'1',
				'3/4',
				'9/16'
			]
		},
		fit: {
			control: {
				type: 'inline-radio'
			},
			options: [
				'cover',
				'fill',
				'contain',
				'none',
				'scale-down'
			]
		}
	}
}

const Template = (args) => ({
	components: {SImg},
	setup() {
		return {args}
	},
	template: `
		<s-img style="max-width: 800px;" v-bind="args"></s-img>`
})

export const Basic = Template.bind({})
Basic.args = {src: 'placeholder-md.jpg', expandSrc: 'placeholder-xl.jpg'}
