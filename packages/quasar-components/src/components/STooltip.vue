<template>
	<q-tooltip :anchor="anchor" :self="self" class="text-body2">
		<slot/>
	</q-tooltip>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

interface Props {
	left?: boolean
	right?: boolean
	top?: boolean
	bottom?: boolean
	collapsed?: boolean
}

const {left, right, top, bottom, collapsed} = defineProps<Props>()

const anchor = ref<string>('bottom middle')
const self = ref<string>('top middle')

if (left || collapsed) {
	anchor.value = 'center left'
	self.value = 'center right'
} else if (right) {
	anchor.value = 'center right'
	self.value = 'center left'
} else if (top) {
	anchor.value = 'top middle'
	self.value = 'bottom middle'
} else if (bottom) {
	anchor.value = 'bottom middle'
	self.value = 'top middle'
}
</script>
<style lang="scss" scoped></style>
