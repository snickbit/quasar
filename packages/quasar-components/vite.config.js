import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
			name: 'snickbit-quasar',
			fileName: (format) => `snickbit-quasar.${format}.js`
		},
		rollupOptions: {
			external: [
				'vue',
				'quasar'
			],
			output: {
				// Provide global variables to use in the UMD build
				// Add external deps here
				globals: {
					vue: 'Vue',
					quasar: 'Quasar'
				},
				assetFileNames: assetInfo => assetInfo.name === 'style.css' ? 'snickbit-quasar.css' : assetInfo.name
			}
		}
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname, 'src'),
			'components': path.resolve(__dirname, 'src/components')
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
	},
	plugins: [
		vue({
			template: {transformAssetUrls}
		}),

		quasar({
			sassVariables: 'src/styles/quasar-variables.scss'
		})
	]
})