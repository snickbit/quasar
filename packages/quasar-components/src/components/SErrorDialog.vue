<template>
	<q-dialog
		ref="dialogRef"
		persistent
		transition-show="scale"
		transition-hide="scale"
		@hide="onDialogHide"
	>
		<q-card class="bg-negative">
			<q-toolbar >
				<q-avatar>
					<q-icon name="error" size="md"/>
				</q-avatar>

				<q-toolbar-title>
					{{ title || 'Error' }}
				</q-toolbar-title>

				<q-btn
					v-close-popup
					flat
					round
					dense
					icon="close"
				/>
			</q-toolbar>

			<q-card-section>
				{{ message }}
			</q-card-section>

			<q-card-actions align="right">
				<slot name="actions">
					<q-space/>
					<q-btn flat label="Cancel" @click="onDialogCancel" />
					<q-btn flat label="Ok" @click="onDialogOK" />
				</slot>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script setup lang="ts">
import {useDialogPluginComponent} from 'quasar'

interface Props {
	title?: string
	message: string
}

const {title, message} = defineProps<Props>()

defineEmits(['update:model-value', ...useDialogPluginComponent.emits])

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
</script>
