<template>
	<div v-if="$table.title">
		<div class="row">
			<div class="column col">
				<h3>{{ $table.title }}</h3>
				<div v-if="$slots['top-left']" class="q-mb-md">
					<slot name="top-left"/>
				</div>
			</div>
			<div v-if="$slots['top-right'] || !disableSearch" :class="{'column': topRightStacked, 'flex items-center': !topRightStacked}">
				<div v-if="$slots['top-right']" :class="{'q-mb-md': topRightStacked, 'q-mr-md': !topRightStacked}" class="text-right">
					<slot name="top-right"/>
				</div>
				<q-input
					v-if="!disableSearch"
					v-model="$table.filter"
					debounce="30"
					dense
					outlined
					placeholder="Search"
				>
					<template #append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</div>
		</div>
		<q-table
			v-model:selected="$table.selected"
			:binary-state-sort="$table.binaryStateSort"
			:columns="tableColumns"
			:filter="$table.filter"
			:loading="$table.loading"
			:pagination="$table.pagination || {}"
			:row-key="rowKey"
			:rows="$table.rows"
			:rows-per-page-options="$table.perPageOptions"
			:selected-rows-label="getSelectedString"
			:selection="selection"
			:style="tableStyles()"
			class="table-sticky-header"
			separator="cell"
			virtual-scroll
			:grid="!!grid"
			@request="onRequest"
		>
			<template #header-cell-image="props">
				<q-th :props="props">
					<div class="flex flex-center">
						<q-icon name="image" size="md"/>
					</div>
				</q-th>
			</template>
			<template v-for="dynamicHeaderSlot in headerSlots" #[dynamicHeaderSlot]="props">
				<slot :name="dynamicHeaderSlot" v-bind="props"/>
			</template>
			<template #body-cell="props">
				<q-td :props="props">
					{{ props.value }}
				</q-td>
			</template>

			<template #body-cell-image="props">
				<q-td :props="props" class="s-table__body-cell-image">
					<s-img :key="props.row.id" :expand-src="props.row.image || props.row.thumbnail" :src="props.row.thumbnail || props.row.image"/>
				</q-td>
			</template>

			<template v-if="$slots['row-actions']" #body-cell-actions="props">
				<q-td :props="props" auto-width>
					<component :is="$slots['row-actions']" v-bind="props"/>
				</q-td>
			</template>

			<template v-for="dynamicBodySlot in bodySlots" #[dynamicBodySlot]="props">
				<slot :name="dynamicBodySlot" v-bind="props"/>
			</template>

			<template v-if="$slots['body-selection']" #body-selection="scope">
				<slot name="body-selection" v-bind="scope"/>
			</template>

			<template v-if="$table.pagination" #bottom="scope">
				<span class="q-table__bottom-item">
					Records {{ scope.pagination.page * scope.pagination.rowsPerPage + 1 }} - {{ scope.pagination.page * scope.pagination.rowsPerPage + scope.pagination.rowsPerPage }} of {{ $table.pagination.rowsNumber }}
				</span>
				<q-space/>
				<span class="q-table__bottom-item">
					Records per page:
				</span>
				<q-select
					v-model="scope.pagination.rowsPerPage"
					:options="$table.perPageOptions"
					borderless
					dense
					options-cover
					options-dense
					@update:model-value="onRequest(scope)"
				/>
				<q-pagination v-model="scope.pagination.page" :max="$table.pagination.rowsNumber" input @update:model-value="onRequest(scope)"/>
			</template>

			<template #item="props">
				<div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3" >
					<q-card>
						<template v-if="gridOptions.actionsOnTop || getTitle(props)">
							<q-card-section class="flex items-center">
								<s-table-grid-title v-bind="getTitle(props)"/>
								<q-space/>
								<div v-if="$slots['row-actions']" class="flex">
									<slot name="row-actions" v-bind="props"/>
								</div>
							</q-card-section>
						</template>

						<q-list separator bordered>
							<template v-for="col in props.cols" :key="col.name">
								<q-item v-if="col.name !== gridOptions.titleField || gridOptions.keepNameInList">
									<q-item-section>
										<slot :name="'header-cell-' + col.name" v-bind="props">
											<q-item-label>{{ col.label }}</q-item-label>
										</slot>
									</q-item-section>
									<q-item-section side>
										<q-item-label caption>
											<slot :name="'body-cell-' + col.name" v-bind="props">
												{{ col.value }}
											</slot>
										</q-item-label>
									</q-item-section>
								</q-item>
							</template>
						</q-list>

						<template v-if="$slots['row-actions'] && !gridOptions.actionsOnTop">
							<q-card-actions class="flex justify-end">
								<slot name="row-actions" v-bind="props"/>
							</q-card-actions>
						</template>
					</q-card>
				</div>
			</template>
		</q-table>
	</div>
</template>
<script lang="ts" setup>
import {isEmpty} from '@snickbit/utilities'
import {computed, reactive, ref, useSlots, watch} from 'vue'
import {defaultTableOptions, STable} from './table'
import SImg from '../SImg.vue'
import STableGridTitle from './STableGridTitle.vue'

const $slots = useSlots()

interface GridOptions {
	title?: string
	titleField?: string
	actionsOnTop?: boolean
	keepNameInList?: boolean
}

interface Props {
	table: STable
	grid?: GridOptions | boolean
	disableSearch?: boolean
	topRightStacked?: boolean
	rowKey?: string
	selection: 'multiple' | 'none' | 'single'
}

let {table = {...defaultTableOptions}, disableSearch, topRightStacked, rowKey = '_id', selection = 'none', grid} = defineProps<Props>()
watch(() => table, newTable => {
	Object.assign($table, newTable)
	parseGridOptions()
}, {deep: true})

const $emit = defineEmits(['request', 'update:table'])
const $table: STable = reactive(Object.assign(defaultTableOptions, table))

const tableColumns = computed(() => {
	const table_columns = $table.columns.slice()
	for (let column of table_columns) {
		if (column.sortable && !column.name) {
			column.name = typeof column.field === 'string' ? column.field : column.label
		}
	}
	if ($slots['row-actions'] && !grid) {
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

	if ($table.title) {
		base += 56
	}

	styles['max-height'] = `calc(100vh - ${base}px)`

	return {...styles, ...$table.styles || {}}
}

const bodySlots = computed(() => Object.keys($slots).filter(key => key.startsWith('body-cell-') && key !== 'body-cell-actions'))
const headerSlots = computed(() => Object.keys($slots).filter(key => key.startsWith('header-cell-')))

function getSelectedString() {
	return isEmpty($table.selected) ? '' : `${$table.selected.length} / ${$table.rows.length} selected`
}

interface RowProps {
	row: any
	cols: any[]
	grid?: boolean
	color?: string
	rowIndex: number
	dark?: boolean
	dense?: boolean
	expand?: boolean
	colsMap: any
}

type GridTitle = {
	label?: string
	value: string | false
}

function getTitle(props: RowProps): GridTitle {
	if (gridOptions.value.title) {
		return {value: gridOptions.value.title}
	} else if (gridOptions.value.titleField) {
		return {
			label: props.colsMap[gridOptions.value.titleField]?.label || gridOptions.value.titleField,
			value: props.row[gridOptions.value.titleField]
		}
	}
	return {
		label: '',
		value: false
	}
}

const gridOptions = ref()
const defaultGridOptions = {
	title: '',
	titleField: '',
	actionsOnTop: false
}
parseGridOptions()
function parseGridOptions() {
	if (!grid || grid === true) {
		gridOptions.value = {...defaultGridOptions}
	} else {
		gridOptions.value = {
			...defaultGridOptions,
			...grid
		}
	}
}

</script>
<style lang="scss">
.s-table__body-cell-image {
	min-height:100px;
	min-width:100px;
}
</style>
