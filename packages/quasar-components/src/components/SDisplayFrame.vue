<template>
	<s-display-card :fullscreen="fullscreen">
		<slot name="heading">
			<s-heading v-if="heading">
				{{ heading }}
				<template v-if="!nonExpandable" #rightHeading>
					<q-btn :icon="fullscreen? 'fullscreen_exit' : 'fullscreen'" color="primary" round @click="fullscreen = !fullscreen"/>
				</template>
			</s-heading>
		</slot>
		<div v-if="$slots.description">
			<slot name="description"/>
		</div>
		<q-layout class="s-display-frame-layout" container view="lhh LpR lff">
			<slot/>
		</q-layout>
	</s-display-card>
</template>
<script>
import {ref} from 'vue'
import SDisplayCard from './SDisplayCard.vue'
import SHeading from './SHeading.vue'

export default {
	name: 'SDisplayFrame',
	components: {
		SDisplayCard,
		SHeading
	},
	props: {
		heading: String,
		nonExpandable: Boolean
	},
	setup() {
		return {fullscreen: ref(false)}
	}
}
</script>
<style lang="scss">
.s-display-frame-layout{
	min-height: 500px
}
</style>
