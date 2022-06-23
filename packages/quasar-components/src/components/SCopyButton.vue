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
import {ElementAnchor} from '../quasar'
import SCopy from './SCopy.vue'

interface Props {
	content?: string
	anchor?: ElementAnchor
	self?: ElementAnchor
	offset?: [number, number] | undefined
	copiedLabel?: string
	label?: string | false
	copiedTimeout?: number
	round?: boolean
	flat?: boolean
	dense?: boolean
	icon?: string
}

const {
	content,
	anchor = 'bottom middle' as Props['anchor'],
	self = 'top middle' as Props['self'],
	offset = [0, 0],
	copiedLabel = 'Copied!',
	label = 'Copy to clipboard',
	copiedTimeout = 2000,
	round = true,
	flat = true,
	dense,
	icon = 'copy'
} = defineProps<Props>()

const disabled = computed(() => !content || !content.length)
</script>
