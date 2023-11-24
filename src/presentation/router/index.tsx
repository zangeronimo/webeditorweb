import { LoginFactory } from '@/application/factory/login'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/webeditor/dashboard'
import { AuthenticatedUrl } from './authenticatedUrl'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedUrl>
            <Dashboard />
          </AuthenticatedUrl>
        }
      />
      <Route path="/auth" element={<LoginFactory />} />
    </Routes>
  )
}
