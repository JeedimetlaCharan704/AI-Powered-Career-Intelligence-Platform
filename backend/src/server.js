const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const env = require('./config/env')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')

const authRoutes = require('./routes/auth.routes')
const profileRoutes = require('./routes/profile.routes')
const resumeRoutes = require('./routes/resume.routes')
const githubRoutes = require('./routes/github.routes')
const analyticsRoutes = require('./routes/analytics.routes')

const app = express()

app.use(helmet())
app.use(cors({ origin: env.corsOrigin }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false }))

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  windowMs: env.rateLimitWindow,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/github', githubRoutes)
app.use('/api/analytics', analyticsRoutes)

app.all('*', (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` })
})

app.use(errorHandler)

async function start () {
  await connectDB()
  app.listen(env.port, () => {
    console.log(`[Server] SkillPilot AI API running on port ${env.port} (${env.nodeEnv})`)
  })
}

if (env.nodeEnv !== 'test') {
  start()
}

module.exports = app
