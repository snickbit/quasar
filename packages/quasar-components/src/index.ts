import * as components from './ui'
import plugin from './plugin'

// component styles
import './styles/index.scss'

// export default installable components
export default plugin(Object.keys(components).map(
	(key) => components[key as keyof typeof components]
))

// export named components
export * from './ui'

