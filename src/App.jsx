import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './index.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import { TiffinProvider } from './contexts/TiffineContext'
import ClientPage from './pages/ClientPage'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' />
}

function App() {

  return (
    <AuthProvider>
      <TiffinProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route
              path='/client/:clientId'
              element={
                <PrivateRoute>
                  <ClientPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TiffinProvider>
      <footer className="fixed bottom-0 w-full bg-gray-100 text-center py-2 text-sm text-gray-600 z-50">
        &copy; Shivam Bathre 2025
      </footer>
    </AuthProvider>
  )
}

export default App
