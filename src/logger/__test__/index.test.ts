import 'mocha'
import { expect } from 'chai'
import Logger from '../'

describe("Logger's test module", function () {
  const logger_default = new Logger()
  const logger_cutstom = new Logger({
    debug: true,
    logLevel: 'detail',
    logPrefix: 'CUSTOM'
  })
  const proto = Logger.prototype

  it('Logger is a class', function () {
    expect(Logger).to.be.an('function')
  })

  it('Logger\'s prototype', function () {
    expect(Logger).to.have.property('prototype')
    expect(proto).to.have.property('constructor').to.be.a('function')
    expect(proto).to.have.property('log').to.be.a('function')
    expect(proto).to.have.property('logErr').to.be.a('function')
    expect(proto).to.have.property('logInfo').to.be.a('function')
    expect(proto).to.have.property('logWarn').to.be.a('function')
    expect(proto).to.have.property('_logOptimize').to.be.a('function')
  })

  it('const logger_default = new Logger()', function () {
    expect(logger_default).to.be.an('object')
    expect(logger_default).to.have.property('debug').to.be.a('boolean').to.be.false
    expect(logger_default).to.have.property('logLevel').to.be.a('number').to.be.equal(3)
    expect(logger_default).to.have.property('logPrefix').to.be.a('string').to.be.equal('Peeler-Js')
    expect(logger_default).to.have.property('__proto__').to.be.an('object').to.be.equal(proto)
  })

  it('const logger_cutstom = new Logger(config)', function () {
    expect(logger_cutstom).to.be.an('object')
    expect(logger_cutstom).to.have.property('debug').to.be.a('boolean').to.be.true
    expect(logger_cutstom).to.have.property('logLevel').to.be.a('number').to.be.equal(0)
    expect(logger_cutstom).to.have.property('logPrefix').to.be.a('string').to.be.equal('CUSTOM')
    expect(logger_cutstom).to.have.property('__proto__').to.be.an('object').to.be.equal(proto)
  })
})
