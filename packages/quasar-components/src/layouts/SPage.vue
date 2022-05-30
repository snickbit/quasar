<template>
	<q-page :padding="padding" :style-fn="styleFn" :class="pageClass">
		<div class="q-page--inner" :class="innerClass">
			<slot/>
		</div>
	</q-page>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'

interface Props {
	padding?: boolean
	styleFn?(offset: number, height: number): any
	center?: boolean
	innerClass?: Record<string, any> | string[]
}

const {padding = true, styleFn, center = false, innerClass = []} = defineProps<Props>()

const pageClass = ref<string[]>([])

watch(() => center, makeClasses)

makeClasses()

function makeClasses() {
	if (center) {
		pageClass.value = ['row items-center justify-evenly']
	}
}
</script>
<style lang="scss" scoped></style>
