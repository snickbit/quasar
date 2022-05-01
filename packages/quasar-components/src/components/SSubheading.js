import {hSlot} from 'quasar/src/utils/private/render.js'
import {defineComponent, h} from 'vue'
import SHeading from './SHeading.vue'

export default defineComponent({
	name: 'SSubheading',
	props: {
		center: Boolean,
		size: {
			type: String,
			default: 'h3'
		}
	},
	setup(props, {slots}) {
		return () => h(SHeading, Object.assign({}, props, {subheading: true}), hSlot(slots.default))
	}
})
