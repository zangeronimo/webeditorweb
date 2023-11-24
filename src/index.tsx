import ReactDOM from 'react-dom/client'
import { App } from './presentation/App'
import '@/presentation/styles/global.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App />)
