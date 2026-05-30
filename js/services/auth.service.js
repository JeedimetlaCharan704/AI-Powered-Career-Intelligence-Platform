const AuthService = (function () {
  const DEMO_USERS = {
    student: {
      email: 'student@skillpilot.ai',
      password: 'demo123',
      role: 'student',
      name: 'Aryan Sharma'
    },
    mentor: {
      email: 'mentor@skillpilot.ai',
      password: 'demo123',
      role: 'mentor',
      name: 'Dr. Priya Patel'
    },
    recruiter: {
      email: 'recruiter@skillpilot.ai',
      password: 'demo123',
      role: 'recruiter',
      name: 'Rahul Verma'
    }
  }

  function _simulateLatency (ms) {
    return new Promise(resolve => setTimeout(resolve, ms || 600 + Math.random() * 400))
  }

  async function login (email, password) {
    await _simulateLatency()

    const matched = Object.values(DEMO_USERS).find(
      u => u.email === email && u.password === password
    )

    if (!matched) {
      return {
        success: false,
        error: 'Invalid email or password. Try demo credentials.',
        data: null,
        suggestions: ['Use student@skillpilot.ai / demo123', 'Use mentor@skillpilot.ai / demo123', 'Use recruiter@skillpilot.ai / demo123']
      }
    }

    const { password: _, ...user } = matched
    const now = Date.now()

    Store.set('user', {
      ...user,
      id: 'usr_' + now,
      avatar: null,
      joinedAt: new Date().toISOString()
    })
    Store.set('isLoggedIn', true)
    Store.set('userRole', user.role)
    Store.set('sessionStart', now)
    Store.set('lastActivity', now)

    return {
      success: true,
      error: null,
      data: {
        user: Store.get('user'),
        redirect: user.role === 'mentor' ? '/admin.html'
          : user.role === 'recruiter' ? '/admin.html'
          : '/index.html'
      }
    }
  }

  async function loginWithProvider (provider) {
    await _simulateLatency(1200)

    const providerUsers = {
      google: { email: 'aryan.sharma@gmail.com', name: 'Aryan Sharma', role: 'student' },
      github: { email: 'aryan@github.com', name: 'Aryan S.', role: 'student' },
      linkedin: { email: 'aryan.sharma@linkedin.com', name: 'Aryan Sharma', role: 'student' }
    }

    const profile = providerUsers[provider] || providerUsers.google
    const now = Date.now()

    Store.set('user', {
      ...profile,
      id: 'usr_' + now,
      avatar: null,
      joinedAt: new Date().toISOString(),
      provider
    })
    Store.set('isLoggedIn', true)
    Store.set('userRole', profile.role)
    Store.set('sessionStart', now)
    Store.set('lastActivity', now)

    return {
      success: true,
      error: null,
      data: {
        user: Store.get('user'),
        redirect: '/index.html'
      }
    }
  }

  async function logout () {
    await _simulateLatency(200)
    const role = Store.get('userRole')
    Store.set('user', null)
    Store.set('isLoggedIn', false)
    Store.set('userRole', null)
    return { success: true, data: { redirect: '/login.html', previousRole: role } }
  }

  async function getSession () {
    await _simulateLatency(100)
    const user = Store.get('user')
    const isLoggedIn = Store.get('isLoggedIn')
    return {
      success: true,
      data: {
        isLoggedIn,
        user: isLoggedIn ? user : null,
        role: Store.get('userRole')
      },
      confidence: isLoggedIn ? 'High' : 'Low',
      calculation: {
        steps: ['Checked localStorage for existing session', `User ${isLoggedIn ? 'found' : 'not found'}`]
      }
    }
  }

  async function register (profile) {
    await _simulateLatency(800)
    const user = {
      ...profile,
      id: 'usr_' + Date.now(),
      joinedAt: new Date().toISOString(),
      role: profile.role || 'student'
    }
    const now = Date.now()
    Store.set('user', user)
    Store.set('isLoggedIn', true)
    Store.set('userRole', user.role)
    Store.set('sessionStart', now)
    Store.set('lastActivity', now)
    return { success: true, data: { user, redirect: user.role === 'student' ? '/index.html' : '/admin.html' } }
  }

  function updateActivity () {
    Store.set('lastActivity', Date.now())
  }

  function isSessionExpired () {
    const last = Store.get('lastActivity')
    const timeout = Store.get('sessionTimeout')
    if (!last || !timeout) return false
    return Date.now() - last > timeout
  }

  function getSessionRemaining () {
    const last = Store.get('lastActivity')
    const timeout = Store.get('sessionTimeout')
    if (!last || !timeout) return null
    const elapsed = Date.now() - last
    const remaining = Math.max(0, timeout - elapsed)
    return {
      elapsed,
      remaining,
      expired: elapsed > timeout,
      formatted: _formatDuration(remaining)
    }
  }

  function _formatDuration (ms) {
    const totalSec = Math.floor(ms / 1000)
    const min = Math.floor(totalSec / 60)
    const sec = totalSec % 60
    return `${min}m ${sec}s`
  }

  return { login, loginWithProvider, logout, getSession, register, updateActivity, isSessionExpired, getSessionRemaining }
})()
