<template>
	<div class="s-copy" @click="onCopy">
		<slot/>
		<q-tooltip
			:anchor="anchor"
			:class="{'bg-positive': copied, 'hidden': !tooltipLabel, 'visible': tooltipLabel}"
			:offset="offset"
			:self="self"
			@hide="copied=false"
		>
			{{ tooltipLabel }}
		</q-tooltip>
	</div>
</template>
<script lang="ts" setup>
import {isNullDefined} from '@snickbit/utilities'
import {computed, ComputedRef, ref} from 'vue'
import {useCopyHelper} from '../composables/use-copy-helper'

interface Props {
	modelValue?: string | number
	anchor?: 'top left' | 'top middle' | 'top right'
		| 'top start' | 'top end' | 'center left'
		| 'center middle' | 'center right' | 'center start'
		| 'center end' | 'bottom left' | 'bottom middle'
		| 'bottom right' | 'bottom start' | 'bottom end' | undefined
	self?: 'top left' | 'top middle' | 'top right'
		| 'top start' | 'top end' | 'center left'
		| 'center middle' | 'center right' | 'center start'
		| 'center end' | 'bottom left' | 'bottom middle'
		| 'bottom right' | 'bottom start' | 'bottom end' | undefined
	offset?: [number, number] | undefined
	copiedLabel?: string
	label?: string | false
	copiedTimeout?: number
	disableTooltip?: boolean
}

const {
	modelValue = '',
	anchor = 'bottom middle' as Props['anchor'],
	self = 'top middle'  as Props['self'],
	offset = [0, 0],
	copiedLabel = 'Copied!',
	label = 'Copy to clipboard',
	copiedTimeout = 2000,
	disableTooltip
} = defineProps<Props>()

const copied = ref(false)
const copier = useCopyHelper(copied)

const content: ComputedRef<string | null> = computed(() => !isNullDefined(modelValue) ? String(modelValue) : null)

const disabled: ComputedRef<boolean> = computed(() => !content.value || !content.value.length)
const tooltipLabel: ComputedRef<string> = computed(() => {
	if (copied.value) {
		return copiedLabel
	} else if (!disableTooltip && label) {
		return label
	} else {
		return ''
	}
})

function onCopy() {
	if (!disabled.value && content.value) {
		copier.copy(content.value, copiedTimeout)
	}
}
</script>
<style lang="scss" scoped>
.s-copy {
	cursor: pointer;
}
</style>
