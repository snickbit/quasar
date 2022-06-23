<template>
	<component :is="tag" :class="classes" :style="styles">
		<component :is="tag" :class="child_classes">
			<slot/>
		</component>
	</component>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import {useQuasar} from 'quasar'
import useFullscreen, {useFullscreenEmits} from 'quasar/src/composables/private/use-fullscreen'

interface Props {
	fullscreen?: boolean
	noRouteFullscreenExit?: boolean
	dark?: boolean | null
	tag?: string
	square?: boolean
	flat?: boolean
	bordered?: boolean

	height?: number | string

	padding?: boolean | number | string
}

const {
	dark,
	tag,
	square,
	flat,
	bordered,
	height,
	padding
} = defineProps<Props>()

defineEmits([...useFullscreenEmits])

const $q = useQuasar()

const {inFullscreen} = useFullscreen()

const classes = computed(() => {
	const cls = ['s-display-card']

	if ($q.dark.isActive || dark) {
		cls.push('s-display-card--dark q-dark')
	}

	if (inFullscreen.value === true) {
		cls.push('fullscreen')
	}

	if (bordered) {
		cls.push('s-display-card--bordered')
	}

	if (square) {
		cls.push('s-display-card--square no-border-radius')
	}

	if (flat) {
		cls.push('s-display-card--flat no-shadow')
	}

	if (padding) {
		cls.push('q-padding-md')
	}

	return cls
})

const styles = computed(() => $q.fullscreen.isActive !== true && height !== void 0 ? {height} : {})

const child_classes = computed(() => 's-display-card__section s-display-card__section--vert')

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
