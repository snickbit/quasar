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
<script lang="ts" setup>
import {ref, watch} from 'vue'

interface Props {
	size?: string
	center?: boolean
}

const {size = 'h3', center} = defineProps<Props>()
const classes = ref([])

setClasses(size)
watch(() => size, setClasses)

function setClasses(val: string) {
	let cls = [`text-${val}`]

	if (center) {
		cls.push('text-center')
	}

	return cls
}
</script>
