<template>
	<s-copy v-if="value || showNull" v-ripple :disable-tooltip="!tooltip" :label="tooltipLabel" :model-value="value" class="s-item-detail rounded-borders col">
		<div v-if="hasLabel">
			<slot name="label">
				<span class="text-muted s-item-detail__label">{{ label }}</span>
			</slot>
			<q-separator class="q-mb-sm"/>
		</div>
		<div :class="valueClass">
			<slot>
				{{ value }}
			</slot>
		</div>
	</s-copy>
</template>
<script setup>
import {computed, useSlots} from 'vue'
import SCopy from './SCopy'

const $props = defineProps({
	label: {
		type: String,
		default: ''
	},
	tooltip: Boolean,
	tooltipLabel: {
		type: [String, Boolean],
		default: 'Copy to clipboard'
	},
	value: {
		type: [String, Number],
		default: ''
	},
	size: {
		type: String,
		default: ''
	},
	showNull: Boolean
})
const $slots = useSlots()
const hasLabel = computed(() => $slots.label || $props.label)
const valueClass = computed(() => {
	const classes = ['s-item-detail__value']
	if ($props.size) classes.push(`text-${$props.size}`)
	return classes
})
</script>
<style lang="scss" scoped>
.s-item-detail {
	margin: 8px;
	min-width: 200px;
	padding: 4px;
	border: 1px solid transparent;
	cursor: pointer;
	position: relative;

	&:hover {
		border: 1px solid #CCC;
	}

	.s-item-detail__value {
		line-break: anywhere;
	}
}
</style>
