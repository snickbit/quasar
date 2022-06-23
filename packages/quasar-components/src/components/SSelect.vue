<template>
	<q-select
		:model-value="modelValue"
		filled
		hide-selected
		map-options
		multiple
		v-bind="$attrs"
		@update:model-value="$emit('update:model-value', $event)"
	>
		<template v-for="(data, key) in $slots" #[key]="props">
			<slot :name="key" v-bind="props"/>
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
<script lang="ts" setup>
import {QSelect} from 'quasar'

interface Props {
	modelValue: any
	checkbox?: boolean
	multiple?: boolean
}

defineProps<Props>()
defineEmits(['update:model-value'])
</script>
