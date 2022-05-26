<template>
	<div :class="classes" class="s-separator">
		<slot>
			<q-separator :inset="inset" :vertical="vertical"/>
		</slot>
	</div>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'

interface Props {
	vertical?: boolean
	inset?: boolean
	spaced?: 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs'
}

const {vertical, inset = true, spaced = 'md'} = defineProps<Props>()

const classes = ref<string[]>([])

watch(() => spaced, makeClasses)

makeClasses()

function makeClasses() {
	const cls: string[] = []

	const direction = vertical ? 'px' : 'py'

	if (vertical) {
		cls.push('s-separator--vertical')
	}

	if (spaced !== 'none') {
		cls.push(`q-${direction}-${spaced}`)
	}

	classes.value = cls
}
</script>
<style lang="scss" scoped>
.s-separator--vertical {
	height: 100%;

	.q-separator--vertical {
		height: 100%;
	}
}
</style>
