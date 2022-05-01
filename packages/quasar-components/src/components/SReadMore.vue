<template>
	<div class="read-more">
		<div :style="read_more ? '' : 'max-height:' + maxHeight + 'px; overflow: hidden;'">
			<div ref="content">
				<slot></slot>
			</div>
		</div>
		<div v-if="enabled" class="text-right">
			<a v-if="link" href="#" @click.stop.prevent="read_more = !read_more">
				{{ read_more ? lessText : moreText }}
			</a>
			<q-btn v-else :color="color" :size="buttonSize" @click="read_more = !read_more">
				{{ read_more ? lessText : moreText }}
			</q-btn>
		</div>
	</div>
</template>
<script>
import {defineComponent, ref, watch} from 'vue'

export default defineComponent({
	name: 'SReadMore',
	props: {
		modelValue: {},
		maxHeight: {
			default: 51
		},
		color: {
			default: 'primary'
		},
		buttonSize: {
			type: String,
			default: 'md'
		},
		moreText: {
			default: 'Read More'
		},
		lessText: {
			default: 'Read Less'
		},
		link: Boolean
	},
	setup(props) {
		const content = ref(null)
		const enabled = ref(false)
		const read_more = ref(false)

		const checkEnabled = () => {
			enabled.value = props.modelValue === undefined ? content.value.offsetHeight > props.maxHeight : props.modelValue
			read_more.value = !enabled.value
		}

		watch(() => props.modelValue, () => checkEnabled())
		watch(content, () => checkEnabled())

		return {
			content,
			enabled,
			read_more
		}
	}
})
</script>
