import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { 
  Code, 
  SignOut,
  Users,
  Briefcase,
  Article,
  Mail,
  Plus,
  Eye,
  Trash,
  PencilSimple,
  TrendUp,
  Calendar
} from '@phosphor-icons/react'
import { contactAPI, teamAPI, projectsAPI, blogAPI } from '@/api'

interface Stats {
  team: number
  projects: number
  blogPosts: number
  contactMessages: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState<Stats>({
    team: 0,
    projects: 0,
    blogPosts: 0,
    contactMessages: 0,
    unreadMessages: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('admin-token') || ''
      
      const [teamData, projectsData, blogData, contactStats] = await Promise.all([
        teamAPI.getAllAdmin(token),
        projectsAPI.getAllAdmin(token),
        blogAPI.getAllAdmin(token),
        contactAPI.getStats(token)
      ])

      setStats({
        team: teamData.count || 0,
        projects: projectsData.count || 0,
        blogPosts: blogData.count || 0,
        contactMessages: contactStats.data.total || 0,
        unreadMessages: contactStats.data.unread || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
      toast.error('Failed to load dashboard statistics')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  const quickActions = [
    {
      title: 'Add Team Member',
      icon: Plus,
      color: 'text-blue-600',
      action: () => toast.info('Team management coming soon!')
    },
    {
      title: 'Create Project',
      icon: Plus,
      color: 'text-green-600',
      action: () => toast.info('Project management coming soon!')
    },
    {
      title: 'Write Blog Post',
      icon: Plus,
      color: 'text-purple-600',
      action: () => toast.info('Blog management coming soon!')
    },
    {
      title: 'View Messages',
      icon: Eye,
      color: 'text-orange-600',
      action: () => toast.info('Message management coming soon!')
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
          <Code className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Robocode CMS</h1>
                <p className="text-xs text-muted-foreground">Content Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <SignOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your portfolio website
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                  <p className="text-3xl font-bold text-foreground">{stats.team}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Projects</p>
                  <p className="text-3xl font-bold text-foreground">{stats.projects}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                  <p className="text-3xl font-bold text-foreground">{stats.blogPosts}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Article className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-foreground">{stats.contactMessages}</p>
                    {stats.unreadMessages > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {stats.unreadMessages} new
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-12"
                    onClick={action.action}
                  >
                    <action.icon className={`w-5 h-5 mr-3 ${action.color}`} />
                    {action.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">API Server</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Database</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Connected</Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Email Service</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Configured</Badge>
                </div>

                <Separator />

                <div className="pt-4">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Robocode CMS v1.0.0 - Professional Development Solutions from Ecuador 🇪🇨
          </p>
        </motion.div>
      </main>
    </div>
  )
}