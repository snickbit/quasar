<template>
	<q-input
		:model-value="modelValue"
		:mask="inputMask"
		:readonly="readonly"
		:input-class="{'non-selectable cursor-pointer': readonly}"
		@update:model-value="updateValue"
		@click="onClick"
	>
		<template #append>
			<q-icon :name="icon" class="cursor-pointer" @click="popup = !popup"/>
			<q-popup-proxy
				v-model="popup"
				cover
				transition-show="scale"
				transition-hide="scale"
				anchor="bottom middle"
				self="top middle"
			>
				<q-date :model-value="modelValue" :mask="dateMask" @update:model-value="updateValue">
					<div class="row items-center justify-end">
						<q-btn v-close-popup label="Close" color="primary" flat/>
					</div>
				</q-date>
			</q-popup-proxy>
		</template>
	</q-input>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

interface Props {
	modelValue: string
	inputMask?: string
	dateMask?: string
	icon?: string
	readonly?: boolean
}

const {
	modelValue,
	inputMask = '####-##-##',
	dateMask = 'YYYY-MM-DD',
	icon = 'calendar',
	readonly
} = defineProps<Props>()
const $emit = defineEmits(['update:model-value'])

const popup = ref(false)

function updateValue(newValue: string) {
	$emit('update:model-value', newValue)
}

function onClick() {
	if (readonly) {
		popup.value = !popup.value
	}
}
</script>
<style lang="scss" scoped></style>
