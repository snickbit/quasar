<template>
	<div>
		<component :is="fieldComponent" v-if="field" v-model="field.value" :error="!!field.error" :error-message="field.error || ''" :lazy-rules="lazy" :name="fieldName" :required="field.required" :rules="field.rules" :type="field.type" label-slot>
			<template #label>
				<div v-if="isString(label)" v-html="label"></div>
				<component :is="label" v-else/>
			</template>
			<template v-if="!isInput">
				<div v-if="isString(label)" v-html="label"></div>
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
			isInput.value = true
			return QInput
	}
})

const label = computed(() => {
	return $props.field?.label || $props.field?.name || $props.fieldName
})
</script>
