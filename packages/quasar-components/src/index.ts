import * as components from './ui'

// component styles
import plugin from './plugin'
import './styles/index.scss'

// export default installable components
export default plugin(Object.keys(components).map(key => components[key as keyof typeof components]))

// export named components
export * from './ui'

