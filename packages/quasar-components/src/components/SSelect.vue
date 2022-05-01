<template>
	<q-select filled hide-selected map-options multiple v-bind="$attrs">
		<template v-for="(data, key) in $slots" #[key]="props">
			<slot :name="key" v-bind="props"></slot>
		</template>
		<template v-if="multiple" #option="{ itemProps, opt, selected, toggleOption }">
			<q-item v-bind="itemProps">
				<q-item-section>
					<slot name="toggle-label" v-bind="{ itemProps, opt, selected, toggleOption }">
						<q-item-label>{{ opt }}</q-item-label>
					</slot>
				</q-item-section>
				<q-item-section side>
					<slot name="toggle" v-bind="{ itemProps, opt, selected, toggleOption }">
						<q-checkbox v-if="checkbox" :model-value="selected" @update:model-value="toggleOption(opt)"/>
						<q-toggle v-else :model-value="selected" @update:model-value="toggleOption(opt)"/>
					</slot>
				</q-item-section>
			</q-item>
		</template>
	</q-select>
</template>
<script setup>
import {QSelect} from 'quasar'

defineProps({
	checkbox: Boolean,
	multiple: Boolean
})
</script>
