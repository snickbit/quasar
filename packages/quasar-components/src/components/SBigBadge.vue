<template>
	<div :class="badgeClasses">
		<slot>
			{{ label }}
		</slot>
	</div>
</template>
<script lang="ts" setup>
import {computed} from 'vue'

const $props = defineProps({
	label: {type: String},
	color: {
		type: String,
		default: 'primary'
	}
})

const badgeClasses = computed(() => {
	return ['s-big-badge', `bg-${$props.color}`]
})
</script>
<style lang="scss" scoped>
.s-big-badge {
	display: inline-block;
	padding: 0.5rem 1rem;
	font-size: 1.25rem;
	line-height: 1.5;
	border-radius: 0.25rem;
	font-weight: 700;
	color: #FFF;
	background-color: #000;
}
</style>
