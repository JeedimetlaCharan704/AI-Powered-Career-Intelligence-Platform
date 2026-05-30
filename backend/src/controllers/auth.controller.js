const User = require('../models/User')
const { generateToken } = require('../middleware/auth')
const { AppError } = require('../middleware/errorHandler')

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      throw new AppError('Email already registered', 409)
    }

    const user = await User.create({ name, email, password, role })
    const token = generateToken(user._id)

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    res.status(201).json({
      data: {
        token,
        user,
      },
    })
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401)
    }

    if (!user.isActive) {
      throw new AppError('Account deactivated. Contact support.', 403)
    }

    const token = generateToken(user._id)

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    res.json({
      data: {
        token,
        user,
      },
    })
  } catch (err) {
    next(err)
  }
}

exports.getMe = async (req, res) => {
  res.json({ data: { user: req.user } })
}
