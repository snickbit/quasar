import mitt from 'mitt'
import {copyToClipboard} from 'quasar'
import {UnwrapRef} from 'vue'

/**
 * @param {Ref<UnwrapRef<boolean>>} [copiedRef]
 * @return {CopyHelper}
 */
export function copyHelper(copiedRef) {
	return new CopyHelper(copiedRef)
}

export class CopyHelper {
	timer
	emitter = mitt()
	on = this.emitter.on
	off = this.emitter.off

	/**
	 * @param {Ref<UnwrapRef<boolean>>} [copied]
	 */
	constructor(copied) {
		this.copied = copied
	}

	/**
	 * @param {String} text
	 */
	copy(text) {
		return copyToClipboard(text).then(() => {
			if (this.copied) this.copied.value = true
			this.emitter.emit('copy', text)
			if (this.timer) clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				if (this.copied) this.copied.value = false
				this.timer = null
			}, 2000)
		}).catch(err => console.error(err))
	}
}
