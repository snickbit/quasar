import {copyToClipboard} from 'quasar'
import {Ref, UnwrapRef} from 'vue'

export function useCopyHelper(copiedRef?: Ref<UnwrapRef<boolean>>): CopyHelper {
	return new CopyHelper(copiedRef)
}

export class CopyHelper {
	timer?: any

	copied?: Ref<UnwrapRef<boolean>>

	constructor(copied?: Ref<UnwrapRef<boolean>>) {
		this.copied = copied
	}

	copy(text: string, timeout = 2000): Promise<void> {
		return copyToClipboard(text).then(() => {
			if (this.copied) {
				this.copied.value = true
			}
			if (this.timer) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(() => {
				if (this.copied) {
					this.copied.value = false
				}
				this.timer = null
			}, timeout)
		})
			.catch(err => console.error(err))
	}
}
