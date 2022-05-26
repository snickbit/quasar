<template>
	<q-img
		:alt="alt"
		:class="{'cursor-pointer':canClickToExpand}"
		:fit="fit"
		:placeholder-src="placeholderSrc"
		:ratio="ratio"
		:src="src"
		@click="openDialog"
		@load="handleLoaded"
	>
		<template #error>
			<div class="flex-center bg-transparent fit">
				<q-icon :name="icon" color="negative" size="lg"/>
				<q-tooltip>
					Missing Image
				</q-tooltip>
			</div>
		</template>
		<slot>
			<div v-if="caption" class="absolute-bottom text-subtitle1 text-center">
				{{ caption }}
			</div>
		</slot>
		<q-dialog :model-value="isExpanded" class="s-img--dialog" @update:model-value="closeDialog">
			<div class="full-width">
				<q-img :alt="alt" :src="expandSrc || src" fit="contain"/>
				<q-btn
					v-close-popup
					class="absolute-top-right q-ma-sm"
					flat
					icon="close"
					round
				/>
			</div>
		</q-dialog>
	</q-img>
</template>
<script lang="ts" setup>
import {computed, ref, watch} from 'vue'

interface Props {
	alt?: string
	caption?: string
	disableExpand?: boolean
	expandOnClick?: boolean
	expandSrc?: string
	expanded?: boolean
	fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | undefined
	icon?: string
	placeholderSrc?: string
	ratio?: string
	src?: string
}

const {
	alt,
	caption,
	disableExpand,
	expandOnClick = true,
	expandSrc,
	expanded,
	fit = 'contain' as Props['fit'],
	icon = 'image',
	placeholderSrc,
	ratio = '1',
	src
} = defineProps<Props>()
const $emit = defineEmits(['update:expanded'])

const loaded = ref(false)
const isExpanded = ref(false)

watch(() => expanded, val => isExpanded.value = val)

const canClickToExpand = computed(() => loaded.value === true && disableExpand !== true && expandOnClick)

function openDialog() {
	if (canClickToExpand.value) {
		isExpanded.value = true
		$emit('update:expanded', true)
	}
}

function closeDialog() {
	isExpanded.value = false
	$emit('update:expanded', false)
}

function handleLoaded() {
	loaded.value = true
}
</script>
<style lang="scss" scoped>
.full-image {
	max-width: 100%;
	max-height: 100%;
}

.s-img--dialog {
	.q-dialog__inner > div {
		box-shadow: none;
		width: 800px;
		max-width: 90vw;
		height: 800px;
		max-height: 90vh;
		overflow: hidden;
	}
}
</style>
