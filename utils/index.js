const { format } = require('util')
const random = require('random')

const RequestError = require('./request-error')

exports.delayRandom = (mu = 2., sigma = 1., min = .1) => {
  const normal = random.normal(mu = mu, sigma = sigma)

  return async (fn) => {
    const result = await fn()

    await new Promise((resolve) => {
      const d = Math.max(normal(), min) * 1000
      setTimeout(resolve, d)
    })

    return result
  }
}

exports.getLogger = (name, stream = process.stderr) => {
  return (...args) => {
    stream.write(
      format(...[`${new Date().toISOString()} [${name}] -`, ...args]) + '\n')
  }
}

exports.RequestError = RequestError
