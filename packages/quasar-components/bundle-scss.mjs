#!/usr/bin/env node
import cli from '@snickbit/node-cli'
import {out} from '@snickbit/out'
import bundleScss from 'bundle-scss'
import chokidar from 'chokidar'

cli()
	.name('bundle-scss')
	.options({
		watch: {
			alias: 'w',
			description: 'Watch for changes and rebuild'
		}
	})
	.run().then(async (argv) => {

	if (argv.watch) {
		chokidar.watch(
			'src/styles',
			{persistent: true}).on('change',
			async () => compile()).on('ready',
			() => out.info(`Waiting for file changes...`
			))
	} else {
		await compile()
		return out.done('Done!')
	}
}).catch(err => out.fatal('Error:', err))

const compile = debounce(compileNow, 1000)

async function compileNow() {
	return bundleScss('./src/styles/variables.scss', './dist/variables.scss')
}

function debounce(fn, wait, options = {}) {
	if (!Number.isFinite(wait)) {
		throw new TypeError('Expected `wait` to be a finite number')
	}

	let leadingValue
	let timeout
	let resolveList = []

	return function (...arguments_) {
		return new Promise(resolve => {
			const shouldCallNow = options.before && !timeout

			clearTimeout(timeout)

			timeout = setTimeout(() => {
				timeout = null

				const result = options.before ? leadingValue : fn.apply(this, arguments_)

				for (resolve of resolveList) {
					resolve(result)
				}

				resolveList = []
			}, wait)

			if (shouldCallNow) {
				leadingValue = fn.apply(this, arguments_)
				resolve(leadingValue)
			} else {
				resolveList.push(resolve)
			}
		})
	}
}
