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
<script lang="ts" setup>
import {ref} from 'vue'
import SDisplayCard from './SDisplayCard.vue'
import SHeading from './SHeading.vue'

interface Props {
	heading?: string
	nonExpandable?: boolean
}

const {heading, nonExpandable} = defineProps<Props>()

const fullscreen = ref(false)
</script>
<style lang="scss">
.s-display-frame-layout{
	min-height: 500px
}
</style>
