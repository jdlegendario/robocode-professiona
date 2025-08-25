import { useAuth } from '@/contexts/AuthContext'
import AdminLogin from './Login'
import AdminDashboard from './Dashboard'

export default function AdminPanel() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 bg-primary-foreground rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
    </div>
  )
}