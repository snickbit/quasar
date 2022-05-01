<template>
	<div v-if="table?.title">
		<div class="row">
			<div class="column col">
				<h3>{{ table.title }}</h3>
				<div v-if="$slots['top-left']" class="q-mb-md">
					<slot name="top-left"></slot>
				</div>
			</div>
			<div v-if="$slots['top-right'] || !disableSearch" :class="{'column': topRightStacked, 'flex items-center': !topRightStacked}">
				<div v-if="$slots['top-right']" :class="{'q-mb-md': topRightStacked, 'q-mr-md': !topRightStacked}" class="text-right">
					<slot name="top-right"></slot>
				</div>
				<q-input v-if="!disableSearch" v-model="table.filter" debounce="30" dense outlined placeholder="Search">
					<template #append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</div>
		</div>
		<q-table v-model:selected="table.selected" :binary-state-sort="table.binaryStateSort" :columns="tableColumns" :filter="table.filter" :loading="table.loading" :pagination="table.pagination || {}" :row-key="rowKey" :rows="table.rows" :rows-per-page-options="table.perPageOptions" :selected-rows-label="getSelectedString" :selection="selection" :style="tableStyles()" class="table-sticky-header" separator="cell" virtual-scroll @request="onRequest">
			<template #header-cell-image="props">
				<q-th :props="props">
					<div class="flex flex-center">
						<q-icon name="image" size="md"/>
					</div>
				</q-th>
			</template>
			<template v-for="dynamicHeaderSlot in headerSlots" #[dynamicHeaderSlot]="props">
				<slot :name="dynamicHeaderSlot" v-bind="props"></slot>
			</template>
			<template #body-cell="props">
				<q-td :props="props">
					{{ props.value }}
				</q-td>
			</template>
			<template #body-cell-image="props">
				<q-td :props="props" style="min-height:100px;min-width:100px">
					<s-img :key="props.row.id" :expand-src="props.row.image || props.row.thumbnail" :src="props.row.thumbnail || props.row.image"/>
				</q-td>
			</template>
			<template v-if="$slots['row-actions']" #body-cell-actions="props">
				<q-td :props="props" auto-width>
					<component :is="$slots['row-actions']" v-bind="props"></component>
				</q-td>
			</template>
			<template v-for="dynamicBodySlot in bodySlots" #[dynamicBodySlot]="props">
				<slot :name="dynamicBodySlot" v-bind="props"></slot>
			</template>
			<template v-if="$slots['body-selection']" #body-selection="scope">
				<slot name="body-selection" v-bind="scope"></slot>
			</template>
			<template v-if="table.pagination" #bottom="scope">
				<span class="q-table__bottom-item">
					Records {{ scope.pagination.page * scope.pagination.rowsPerPage + 1 }} - {{ scope.pagination.page * scope.pagination.rowsPerPage + scope.pagination.rowsPerPage }} of {{ scope.pagination.rowsNumber }}
				</span>
				<q-space/>
				<span class="q-table__bottom-item">
					Records per page:
				</span>
				<q-select v-model="scope.pagination.rowsPerPage" :options="table.perPageOptions" borderless dense options-cover options-dense @update:model-value="onRequest(scope)"/>
				<q-pagination v-model="scope.pagination.page" :max="scope.pagination.rowsNumber" input @update:model-value="onRequest(scope)"/>
			</template>
		</q-table>
	</div>
</template>
<script setup>
import {isEmpty} from '@snickbit/utilities'
import {computed, useSlots} from 'vue'
import SImg from './SImg'

const $slots = useSlots()

const $emit = defineEmits(['request'])
const $props = defineProps({
	table: {
		type: Object,
		default: () => ({
			title: '',
			perPageOptions: [
				10,
				25,
				50,
				100
			],
			columns: [
				{
					name: 'Image',
					label: 'Image',
					width: '100px',
					sortable: false,
					cell: 'image'
				},
				{
					name: 'Name',
					label: 'Name',
					sortable: true,
					cell: 'name'
				},
				{
					name: 'Updated At',
					label: 'Updated At',
					sortable: true,
					cell: 'updated_at'
				}
			],
			rows: [],
			selected: [],
			loading: false,
			filter: '',
			pagination: {
				page: 0,
				rowsPerPage: 10,
				rowsNumber: 0
			}
		})
	},
	disableSearch: Boolean,
	topRightStacked: Boolean,
	rowKey: {
		type: String,
		default: '_id'
	},
	selection: {
		type: String,
		default: 'none',
		validator(value) {
			return ['none', 'single', 'multiple'].includes(value)
		}
	}
})

const tableColumns = computed(() => {
	const table_columns = $props.table.columns.slice()
	for (let column of table_columns) {
		if (column.sortable && !column.name) {
			column.name = column.field || column.label
		}
	}
	if ($slots['row-actions']) {
		table_columns.push({
			name: 'actions',
			label: '',
			field: 'actions',
			sortable: false,
			align: 'center'
		})
	}

	return table_columns
})

function onRequest(scope) {
	scope.loading = true
	$emit('request', scope)
}

function tableStyles() {
	let styles = {}

	let base = 100

	if ($props.table.title) {
		base += 56
	}

	styles['max-height'] = `calc(100vh - ${base}px)`

	return {...styles, ...($props.table?.styles || {})}
}

const bodySlots = computed(() => Object.keys($slots).filter(key => key.startsWith('body-cell-') && key !== 'body-cell-actions'))
const headerSlots = computed(() => Object.keys($slots).filter(key => key.startsWith('header-cell-')))

function getSelectedString() {
	return isEmpty($props.table.selected) ? '' : `${$props.table.selected.length} / ${$props.table.rows.length} selected`
}
</script>
