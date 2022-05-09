<template>
	<q-list v-if="menuItems" padding>
		<template v-for="(item, index) of menuItems" :key="index">
			<q-expansion-item v-if="item?.children" :class="itemClasses" :icon="item.icon" :label="item.label">
				<s-menu :inset="inset + 1" :items="item.children"/>
			</q-expansion-item>
			<q-item
				v-else
				:class="itemClasses"
				:clickable="!!item.to"
				:to="item.to"
				@click="handleClick(item)"
			>
				<q-item-section avatar>
					<q-icon v-if="item.icon" :name="item.icon"/>
					<q-img v-else-if="item.image" :src="item.image"/>
				</q-item-section>
				<q-item-section>
					{{ item.label }}
				</q-item-section>
			</q-item>
		</template>
	</q-list>
</template>
<script setup>
import {computed, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useMenu} from '../composables'

const $props = defineProps({
	items: {
		type: Array
	},
	name: String,
	inset: {
		type: Number,
		default: 0
	}
})

const itemClasses = computed(() => ['inset-' + $props.inset])

const menuItems = ref([])

if ($props.items) {
	menuItems.value = $props.items
	watch(() => $props.items, () => menuItems.value = $props.items)
} else if ($props.name) {
	const $menu = useMenu($props.name)
	menuItems.value = $menu.items
	watch(() => $menu.item, () => menuItems.value = $menu.items)
}

function handleClick(item) {
	const $router = useRouter()
	if ($router && $router.currentRoute?.value.path === item.to) {
		$router.go(0)
	}
}
</script>
