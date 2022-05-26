<template>
	<div class="q-mb-md">
		<div :class="{'justify-evenly': $slots.rightHeading || $slots.leftHeading || center}" class="row">
			<div v-if="$slots.leftHeading || ($slots.rightHeading && center)" class="col-12 col-md text-left">
				<slot name="leftHeading"/>
			</div>
			<div :class="classes" class="col-12 col-md-auto">
				<slot/>
			</div>
			<div v-if="$slots.rightHeading || ($slots.leftHeading && center)" class="col-12 col-md text-right">
				<slot name="rightHeading"/>
			</div>
		</div>
		<q-separator color="primary" size="0.25rem" spaced/>
	</div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'SHeading',
	props: {
		center: Boolean,
		size: {
			type: String,
			default: 'h3'
		}
	},
	setup(props) {
		let classes = [`text-${props.size}`]

		if (props.center) {
			classes.push('text-center')
		}

		return {classes}
	}
})
</script>
