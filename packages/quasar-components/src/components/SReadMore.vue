<template>
	<div class="read-more">
		<div :style="toggled ? '' : 'max-height:' + maxHeight + 'px; overflow: hidden;'">
			<div ref="content">
				<slot/>
			</div>
		</div>
		<div v-if="enabled" class="text-right">
			<a v-if="link" href="#" @click.stop.prevent="toggle()">
				{{ toggled ? lessText : moreText }}
			</a>
			<q-btn v-else :color="color" :size="buttonSize" @click="toggle()">
				{{ toggled ? lessText : moreText }}
			</q-btn>
		</div>
	</div>
</template>
<script lang="ts" setup>
import {computed, ref, watch} from 'vue'

interface Props {
	modelValue?: boolean
	maxHeight?: number
	color?: string
	buttonSize?: string
	moreText?: string
	lessText?: string
	link?: boolean
}

const {
	modelValue,
	maxHeight = 51,
	color = 'primary',
	buttonSize = 'md',
	moreText = 'Read More',
	lessText = 'Read Less',
	link = false
} = defineProps<Props>()

const content = ref(null)
// const enabled = ref(false)
const toggled = ref(false)
const enabled = computed(() => modelValue === undefined ? content.value.offsetHeight > maxHeight : modelValue)

function toggle(){
	toggled.value = !toggled.value
}

function checkEnabled() {
	if(!enabled.value && toggled.value) {
		toggled.value = false
	}
}

watch(() => modelValue, () => checkEnabled())
watch(content, () => checkEnabled())
</script>
