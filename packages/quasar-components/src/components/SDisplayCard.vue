<script>
import useDark, {useDarkProps} from 'quasar/src/composables/private/use-dark.js'
import useFullscreen, {useFullscreenEmits, useFullscreenProps} from 'quasar/src/composables/private/use-fullscreen.js'
import {hSlot} from 'quasar/src/utils/private/render.js'
import {computed, defineComponent, getCurrentInstance, h} from 'vue'

export default defineComponent({
	name: 'SDisplayCard',

	props: {
		...useDarkProps, ...useFullscreenProps,

		tag: {
			type: String,
			default: 'div'
		},

		square: Boolean,
		flat: Boolean,
		bordered: Boolean,

		height: String,
		padding: Boolean
	},

	emits: [
		...useFullscreenEmits
	],

	setup(props, {slots}) {
		const vm = getCurrentInstance()
		const isDark = useDark(props, vm.proxy.$q)

		const {inFullscreen} = useFullscreen()

		const classes = computed(() => 's-display-card' + (isDark.value === true ? ' s-display-card--dark q-dark' : '') + (inFullscreen.value === true ? ' fullscreen' : '') + (props.bordered === true ? ' s-display-card--bordered' : '') + (props.square === true ? ' s-display-card--square no-border-radius' : '') + (props.flat === true ? ' s-display-card--flat no-shadow' : ''))

		const style = computed(() => (inFullscreen.value !== true && props.height !== void 0 ? {height: props.height} : {}))

		const child_classes = computed(() => 's-display-card__section s-display-card__section--vert')

		return () => h(props.tag, {
			class: classes.value,
			style: style.value
		}, [
			h(props.tag, {class: child_classes.value}, hSlot(slots.default))
		])
	}
})
</script>
<style lang="scss">
.s-display-card {
	box-shadow: $shadow-2;
	border-radius: $generic-border-radius;
	vertical-align: top;
	background: #FFF;

	> div,
	> img {
		&:first-child {
			border-top: 0;
			border-top-left-radius: inherit;
			border-top-right-radius: inherit;
		}
	}

	> div,
	> img {
		&:last-child {
			border-bottom: 0;
			border-bottom-left-radius: inherit;
			border-bottom-right-radius: inherit;
		}
	}

	> div,
	> img {
		&:not(:first-child) {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}

	> div,
	> img {
		&:not(:last-child) {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	> div {
		border-left: 0;
		border-right: 0;
		box-shadow: none;
	}

	&--bordered {
		border: 1px solid $separator-color;
	}

	&--dark {
		border-color: $separator-dark-color;
	}

	&__section {
		position: relative;

		&--vert {
			padding: 16px;
		}

		&--horiz {
			> div,
			> img {
				&:first-child {
					border-top-left-radius: inherit;
					border-bottom-left-radius: inherit;
				}

				&:last-child {
					border-top-right-radius: inherit;
					border-bottom-right-radius: inherit;
				}

				&:not(:first-child) {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}

				&:not(:last-child) {
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				}
			}

			> div {
				border-top: 0;
				border-bottom: 0;
				box-shadow: none;
			}
		}
	}

	&__actions {
		padding: 8px;
		align-items: center;

		.q-btn {
			padding: 0 8px;
		}

		&--horiz {
			> .q-btn-item + .q-btn-item,
			> .q-btn-group + .q-btn-item,
			> .q-btn-item + .q-btn-group {
				margin-left: 8px;
			}
		}

		&--vert {
			> .q-btn-item.q-btn--round {
				align-self: center;
			}

			> .q-btn-item + .q-btn-item,
			> .q-btn-group + .q-btn-item,
			> .q-btn-item + .q-btn-group {
				margin-top: 4px;
			}

			> .q-btn-group > .q-btn-item {
				flex-grow: 1;
			}
		}
	}

	> img {
		display: block;
		width: 100%;
		max-width: 100%;
		border: 0;
	}
}
</style>
