<template>
	<div class="flex items-center" style="margin-top: -12px;margin-left: -12px;margin-bottom: 24px;">
		<q-btn class="q-mr-md" flat icon="arrow-left" round size="sm" @click="handleBack"></q-btn>
		<q-breadcrumbs active-color="primary" class="text-muted">
			<q-breadcrumbs-el icon="home" to="/"/>
			<q-breadcrumbs-el v-for="breadcrumb of filteredItems" :key="breadcrumb.label" :icon="breadcrumb.icon" :label="breadcrumb.label" :to="breadcrumb.to"/>
		</q-breadcrumbs>
	</div>
</template>
<script setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'

const $props = defineProps({
	items: {
		type: Object,
		default: null
	},
	back: {
		type: [String, Boolean],
		default: true
	}
})

const filteredItems = computed(() => $props.items.filter(item => item.label))

const $router = useRouter()

function handleBack() {
	if ($props.back === true) {
		$router.back()
	} else if ($props.back) {
		$router.push($props.back)
	}
}
</script>
