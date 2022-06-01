<template>
	<div v-if="value">
		<div class="q-table__grid-item-row">
			<div v-if="label" class="q-table__grid-item-title">
				{{ label }}
			</div>
			<div class="text-h6">
				{{ value }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>

interface Props {
	label?: string
	value: string
}

const {label, value} = defineProps<Props>()

</script>
<style lang="scss" scoped></style>
