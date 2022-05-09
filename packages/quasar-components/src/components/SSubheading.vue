<template>
	<s-heading :center="center" :size="size" subheading>
		<slot/>
	</s-heading>
</template>
<script lang="ts" setup>
import SHeading from './SHeading.vue'

interface Props {
	center?: boolean
	size?: string
}

const {center, size} = defineProps<Props>()
</script>
<style lang="scss" scoped></style>
