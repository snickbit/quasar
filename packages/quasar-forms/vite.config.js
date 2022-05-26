import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
			name: 'snickbit-quasar-forms',
			fileName: format => `snickbit-quasar-forms.${format}.js`
		},
		rollupOptions: {
			external: ['vue', 'quasar'],
			output: {
				// Provide global variables to use in the UMD build
				// Add external deps here
				globals: {
					vue: 'Vue',
					quasar: 'Quasar'
				}
			}
		}
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src/components')
		},
		extensions: [
			'.mjs',
			'.js',
			'.ts',
			'.jsx',
			'.tsx',
			'.json',
			'.vue'
		]
	},
	plugins: [vue({template: {transformAssetUrls}}), quasar({sassVariables: 'src/styles/quasar-variables.scss'})]
})
