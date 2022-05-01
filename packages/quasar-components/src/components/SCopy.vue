<template>
	<div class="s-copy" @click="onCopy">
		<slot></slot>
		<q-tooltip :anchor="anchor" :class="{'bg-positive': copied, 'hidden': !tooltipLabel, 'visible': tooltipLabel}" :offset="offset" :self="self" @hide="copied=false">
			{{ tooltipLabel }}
		</q-tooltip>
	</div>
</template>
<script setup>
import {isNullDefined} from '@snickbit/utilities'
import {computed, ref, watch} from 'vue'
import {copyHelper} from '../helpers'

const $props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	anchor: {
		type: String,
		default: 'bottom middle'
	},
	self: {
		type: String,
		default: 'top middle'
	},
	offset: {
		type: Array,
		default: () => [0, 0]
	},
	copiedLabel: {
		type: String,
		default: 'Copied!'
	},
	label: {
		type: [String, Boolean],
		default: 'Copy to clipboard'
	},
	copiedTimeout: {
		type: Number,
		default: 2000
	},
	disableTooltip: Boolean
})

const copied = ref(false)
const copier = copyHelper(copied)

const content = computed(() => !isNullDefined($props.modelValue) ? String($props.modelValue) : null)

const disabled = computed(() => !content.value || !content.value.length)
const tooltipLabel = computed(() => {
	if (copied.value) {
		return $props.copiedLabel
	} else if (!$props.disableTooltip) {
		return $props.label
	} else {
		return ''
	}
})

watch(tooltipLabel, (val) => {
	console.log('tooltipLabel', val)
})

function onCopy() {
	console.log('onCopy')
	if (!disabled.value) {
		copier.copy(content.value)
	} else {
		console.log('disabled')
	}
}
</script>
<style lang="scss" scoped>
.s-copy {
	cursor: pointer;
}
</style>
