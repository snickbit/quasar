import {createStore, useStore} from '@snickbit/minia'
import {arrayUnique, isEmpty, overloadOptions} from '@snickbit/utilities'

export function createMenu(...args) {
	let {name, options, items} = overloadOptions(args, [
		{name: 'string', options: 'object', items: 'array'},
		{options: 'object', items: 'array'},
		{options: 'object'},
		{items: 'array'}
	])
	if (isEmpty(items)) {
		items = [{
			icon: 'home',
			label: 'Home',
			to: '/'
		}]
	}
	if (!name) {
		name = 'main'
	}
	if (!options) {
		options = {}
	}
	const {actions, getters, ...rest} = options

	return createStore(`menu-${name}`,
		{
			getters: {
				isMini() {
					return (!this.$state.open || this.$state.mini) && this.$state.canMini
				},
				isOpen() {
					return this.$state.open
				},
				responsiveTitle() {
					return this.$getters.isMini ? this.$state.miniTitle : this.$state.title
				},
				...getters
			},
			actions: {
				addItems(...items) {
					this.$state.items = arrayUnique((this.$state.items || []).concat(items), 'label')
				},
				toggleMini() {
					this.$state.persistentlyMini = !this.$state.persistentlyMini
					this.$state.mini = !this.$state.mini
				},
				miniDisable() {
					this.$state.canMini = false
				},
				miniEnable() {
					this.$state.canMini = true
				},
				...actions
			},
			persist: ['mini', 'open'],
			...rest
		},
		{
			title: 'Main Menu',
			miniTitle: 'Menu',
			name: 'main',
			persistentlyMini: false,
			mini: false,
			open: true,
			canMini: true,
			...options,
			items
		})
}

export function useMenu(name = 'main') {
	return useStore(`menu-${name}`)
}
