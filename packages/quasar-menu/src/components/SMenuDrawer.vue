<template>
	<q-drawer
		v-if="$menu.$ready"
		v-model="$menu.open"
		:mini="$menu.isMini"
		:mini-to-overlay="$menu.isMini"
		class="bg-primary text-white"
		dark
		elevated
		show-if-above
		side="left"
		@mouseout="$menu.miniEnable()"
		@mouseover="$menu.miniDisable()"
	>
		<div class="text-h4 text-center q-py-md">
			{{ $menu.responsiveTitle }}
		</div>
		<s-menu v-if="$menu" :name="name"/>
	</q-drawer>
</template>
<script setup>
import {QDrawer} from 'quasar'
import {useMenu} from '../composables'
import SMenu from './SMenu'

const $props = defineProps({
	name: {
		type: String,
		default: 'main'
	}
})

const $menu = useMenu($props.name)
</script>
