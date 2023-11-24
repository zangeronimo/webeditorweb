import '@/presentation/styles/global.scss'
import ReactDOM from 'react-dom/client'
import { App } from './presentation/App'
import { Hooks } from './presentation/hooks'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <Hooks>
    <App />
  </Hooks>,
)
