<template>
	<s-copy
		:anchor="anchor"
		:copied-label="copiedLabel"
		:copied-timeout="copiedTimeout"
		:label="label"
		:model-value="content"
		:offset="offset"
		:self="self"
	>
		<q-btn
			:dense="dense"
			:disable="disabled"
			:flat="flat"
			:icon="icon"
			:round="round"
		/>
	</s-copy>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import SCopy from './SCopy.vue'

const $props = defineProps({
	content: {
		type: String,
		default: ''
	},
	round: {
		type: Boolean,
		default: true
	},
	flat: {
		type: Boolean,
		default: true
	},
	dense: Boolean,
	icon: {
		type: String,
		default: 'copy'
	},
	anchor: {
		type: String,
		default: 'center left'
	},
	self: {
		type: String,
		default: 'center middle'
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
		type: String,
		default: 'Copy to clipboard'
	},
	copiedTimeout: {
		type: Number,
		default: 2000
	}
})

const disabled = computed(() => !$props.content || !$props.content.length)
</script>
