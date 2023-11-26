import ReactDOM from 'react-dom/client'
import { App } from './presentation/App'
import { Hooks } from './presentation/hooks'

import '@/presentation/styles/global.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <Hooks>
    <App />
  </Hooks>,
)
