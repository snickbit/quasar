<template>
	<s-copy
		v-if="value || showNull"
		v-ripple
		:disable-tooltip="!tooltip"
		:label="tooltipLabel"
		:model-value="value"
		class="s-item-detail rounded-borders col"
	>
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
<script lang="ts" setup>
import {computed, useSlots} from 'vue'
import SCopy from './SCopy.vue'

interface Props {
	label?: string
	size?: string
	value?: number | string
	showNull?: boolean
	tooltip?: boolean
	tooltipLabel?: string | false
}

const {
	label = '',
	value = '',
	size = '',
	showNull,
	tooltip,
	tooltipLabel = 'Copy to clipboard'
} = defineProps<Props>()

const $slots = useSlots()
const hasLabel = computed(() => $slots.label || label)
const valueClass = computed(() => {
	const classes = ['s-item-detail__value']
	if (size) {
		classes.push(`text-${size}`)
	}
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
