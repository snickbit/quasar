<script>
import {hSlot} from 'quasar/src/utils/private/render.js'
import {defineComponent, h} from 'vue'

export default defineComponent({
	name: 'SContainer',

	setup(props, {slots}) {
		return () => h('div', {
			class: 'container'
		}, hSlot(slots.default))
	}
})
</script>
<style lang="scss">
.container {
	width: 100%;
	padding-right: $flex-gutter-md;
	padding-left: $flex-gutter-md;
	margin-right: auto;
	margin-left: auto;
}

@media (min-width: 576px) {
	.container {
		max-width: 540px;
	}
}

@media (min-width: 768px) {
	.container {
		max-width: 720px;
	}
}

@media (min-width: 992px) {
	.container {
		max-width: 960px;
	}
}

@media (min-width: 1200px) {
	.container {
		max-width: 1140px;
	}
}

@media (min-width: 1400px) {
	.container {
		max-width: 1320px;
	}
}
</style>
