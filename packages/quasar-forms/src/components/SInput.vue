<template>
	<div>
		<component
			:is="fieldComponent"
			v-if="field"
			:error="!!field.error"
			:error-message="field.error || ''"
			:lazy-rules="lazy"
			:model-value="field.value"
			:name="fieldName"
			:required="field.required"
			:rules="field.rules"
			:type="field.type"
			label-slot
			@update:model-value="$emit('update:model-value', $event)"
		>
			<template #label>
				<div v-if="isString(label) || $slots.label">
					<slot name="label">
						{{ label }}
					</slot>
				</div>
				<component :is="label" v-else/>
			</template>
			<template v-if="!isInput">
				<div v-if="isString(label) || $slots.label">
					<slot name="label">
						{{ label }}
					</slot>
				</div>
				<component :is="label" v-else/>
			</template>
		</component>
	</div>
</template>
<script setup>
import {isString} from '@snickbit/utilities'
import {QCheckbox, QInput, QRadio, QSelect, QToggle} from 'quasar'
import {computed, ref} from 'vue'

const $props = defineProps({
	field: {
		type: Object,
		required: true
	},
	fieldName: {
		type: String
	},
	lazy: Boolean
})

defineEmits(['update:model-value'])

const isInput = ref(false)

const fieldComponent = computed(() => {
	switch ($props.field?.type) {
		case 'checkbox':
			return QCheckbox
		case 'radio':
			return QRadio
		case 'select':
			return QSelect
		case 'toggle':
			return QToggle
		default:
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			isInput.value = true
			return QInput
	}
})

const label = computed(() => {
	return $props.field?.label || $props.field?.name || $props.fieldName
})
</script>
