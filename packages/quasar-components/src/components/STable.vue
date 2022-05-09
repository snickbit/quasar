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
					Records {{ scope.pagination.page * scope.pagination.rowsPerPage + 1 }} - {{ scope.pagination.page * scope.pagination.rowsPerPage + scope.pagination.rowsPerPage }} of {{ scope.pagination.rowsNumber }}
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
				<q-pagination v-model="scope.pagination.page" :max="scope.pagination.rowsNumber" input @update:model-value="onRequest(scope)"/>
			</template>
		</q-table>
	</div>
</template>
<script lang="ts" setup>
import {isEmpty} from '@snickbit/utilities'
import {computed, useSlots, watch} from 'vue'
import SImg from './SImg.vue'

export interface STable {
	title?: string
	perPageOptions?: number[]
	columns?: STableColumn[]
	rows?: any[] | undefined;
	selected?: any[] | undefined;
	loading?: boolean
	filter?: string
	pagination: STablePagination
	styles?: any
}

export interface STableColumn {
	/**
	 * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
	 */
	name: string;
	/**
	 * Label for header
	 */
	label: string;
	/**
	 * Row Object property to determine value for this column or function which maps to the required property
	 * @param row The current row being processed
	 * @returns Value for this column
	 */
	field: string | ((row: any) => any);
	/**
	 * If we use visible-columns, this col will always be visible
	 */
	required?: boolean;
	/**
	 * Horizontal alignment of cells in this column
	 * Default value: right
	 */
	align?: "left" | "right" | "center";
	/**
	 * Tell QTable you want this column sortable
	 */
	sortable?: boolean;
	/**
	 * Compare function if you have some custom data or want a specific way to compare two rows
	 * @param a Value of the first comparison term
	 * @param b Value of the second comparison term
	 * @param rowA Full Row object in which is contained the first term
	 * @param rowB Full Row object in which is contained the second term
	 * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
	 */
	sort?: (a: any, b: any, rowA: any, rowB: any) => number;
	/**
	 * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
	 * Default value: ad
	 */
	sortOrder?: "ad" | "da";
	/**
	 * Function you can apply to format your data
	 * @param val Value of the cell
	 * @param row Full Row object in which the cell is contained
	 * @returns The resulting formatted value
	 */
	format?: (val: any, row: any) => any;
	/**
	 * Style to apply on normal cells of the column
	 * @param row The current row being processed
	 */
	style?: string | ((row: any) => string);
	/**
	 * Classes to add on normal cells of the column
	 * @param row The current row being processed
	 */
	classes?: string | ((row: any) => string);
	/**
	 * Style to apply on header cells of the column
	 */
	headerStyle?: string;
	/**
	 * Classes to add on header cells of the column
	 */
	headerClasses?: string;
}

export interface STablePagination {
	/**
	 * Column name (from column definition)
	 */
	sortBy?: string;
	/**
	 * Is sorting in descending order?
	 */
	descending?: boolean;
	/**
	 * Page number (1-based)
	 */
	page?: number;
	/**
	 * How many rows per page? 0 means Infinite
	 */
	rowsPerPage?: number;
	/**
	 * For server-side fetching only. How many total database rows are there to be added to the table. If set, causes the QTable to emit @request when data is required.
	 */
	rowsNumber?: number;
}


const $slots = useSlots()

interface Props {
	table: STable
	disableSearch: boolean
	topRightStacked: boolean
	rowKey: string
	selection: 'none' | 'single' | 'multiple'
}

const defaultTable: STable = {
	title: '',
	perPageOptions: [
		10,
		25,
		50,
		100
	],
	columns: [],
	rows: [],
	selected: [],
	loading: false,
	filter: '',
	pagination: {
		page: 0,
		rowsPerPage: 10,
		rowsNumber: 0
	}
}

let {table = {...defaultTable}, disableSearch, topRightStacked, rowKey = '_id', selection =  'none'} = defineProps<Props>()

watch(() => table, () => {
	Object.assign($table, table)
}, {deep: true})

const $emit = defineEmits(['request', 'update:table'])
const $table: STable = Object.assign(defaultTable, table)

const tableColumns = computed(() => {
	const table_columns = $table.columns.slice()
	for (let column of table_columns) {
		if (column.sortable && !column.name) {
			column.name = typeof column.field === 'string' ? column.field : column.label
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

	if ($table.title) {
		base += 56
	}

	styles['max-height'] = `calc(100vh - ${base}px)`

	return {...styles, ...($table.styles || {})}
}

const bodySlots = computed(() => Object.keys($slots).filter(key => key.startsWith('body-cell-') && key !== 'body-cell-actions'))
const headerSlots = computed(() => Object.keys($slots).filter(key => key.startsWith('header-cell-')))

function getSelectedString() {
	return isEmpty($table.selected) ? '' : `${$table.selected.length} / ${$table.rows.length} selected`
}
</script>
<style lang="scss">
.s-table__body-cell-image {
	min-height:100px;
	min-width:100px;
}
</style>
