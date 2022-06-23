import {App} from 'vue'
import packageJson from '../package.json'

type ComponentType = any

export interface PluginInstance {
	version: string
	install(app: App): void
}

export default function(components?: ComponentType[]): PluginInstance {
	const installTargets: App[] = []

	function registerComponent(app: App, name: string, component: ComponentType): void {
		const registered = app.component(name)

		if (!registered) {
			app.component(name, component)
		}
	}

	function install(app: App): void {
		if (installTargets.includes(app)) {
			return
		}

		installTargets.push(app)

		if (components) {
			for (const component of components) {
				const {name, alias} = component
				registerComponent(app, name, component)
				if (alias) {
					for (const aliasName of alias) {
						registerComponent(app, aliasName, component)
					}
				}
			}
		}
	}

	return {
		version: packageJson.version,
		install
	}
}
