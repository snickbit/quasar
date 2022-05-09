<template>
	<div>
		<q-form
			v-if="$form.$ready"
			:autofocus="autofocus"
			:greedy="greedy"
			:no-error-focus="noErrorFocus"
			:no-reset-focus="noResetFocus"
			@reset="onReset"
			@submit="onSubmit"
		>
			<slot>
				<slot v-for="(field, fieldName) in $form.fields" :key="fieldName" :name="`form-field-`+fieldName" v-bind="field">
					<s-input :field="field" :field-name="fieldName" lazy/>
				</slot>
				<div class="form-actions">
					<slot name="actions">
						<slot name="submit">
							<q-btn
								v-if="submit !== false"
								:class="actionButtonClasses"
								:disabled="disabled"
								:label="isString(submit) && submit ? submit : 'Submit'"
								:loading="loading"
								class="full-width"
								color="primary"
								@click="onSubmit"
							/>
						</slot>
						<div class="row q-gutter-sm">
							<slot name="reset">
								<q-btn
									v-if="reset !== false"
									:class="actionButtonClasses"
									:disabled="fieldsFilled === 0"
									:label="isString(reset) && reset ? reset : 'Reset'"
									@click="onReset"
								/>
							</slot>
							<slot name="cancel">
								<q-btn
									v-if="cancel !== false"
									:class="actionButtonClasses"
									:disabled="disabled"
									:label="isString(cancel) && cancel ? cancel : 'Cancel'"
									color="negative"
									@click="onCancel"
								/>
							</slot>
						</div>
					</slot>
				</div>
			</slot>
		</q-form>
		<q-banner v-else class="text-white bg-negative">
			<template #avatar>
				<q-icon color="white" name="error"/>
			</template>
			{{ error }}
		</q-banner>
	</div>
</template>
<script setup>
import {count, isEmpty, isString, objectFilter} from '@snickbit/utilities'
import SInput from 'src/components/SInput'
import {computed, ref} from 'vue'
import {useForm} from '../composables/forms'

const $props = defineProps({
	name: {
		type: String,
		required: true
	},
	submit: {
		type: [String, Boolean],
		default: true
	},
	reset: [String, Boolean],
	cancel: [String, Boolean],
	autofocus: Boolean,
	noErrorFocus: Boolean,
	noResetFocus: Boolean,
	greedy: Boolean
})

const $emit = defineEmits(['submit', 'reset', 'cancel'])

const loading = ref(false)
const disabled = ref(false)
const error = ref('')

let $form = useForm($props.name)
const fieldsFilled = computed(() => $form && count(objectFilter($form.fields, field => !isEmpty(field.value))))
const actionButtonClasses = computed(() => ({'col': [$props.submit, $props.reset, $props.cancel].filter(v => v !== false).length > 1}))

if (!$props.name) {
	error.value = 'No form name provided'
}

function onSubmit() {
	if ($props.submit && $form.validate()) {
		$emit('submit', $form)
	}
}

function onReset() {
	if ($props.reset && $form) {
		$form.$reset()
		$emit('reset')
	}
}

function onCancel() {
	if ($props.cancel && $form) {
		$form.$reset()
		$emit('cancel')
	}
}
</script>
