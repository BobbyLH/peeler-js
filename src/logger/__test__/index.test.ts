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
    expect(proto).to.have.property('detail').to.be.a('function')
    expect(proto).to.have.property('logErr').to.be.a('function')
    expect(proto).to.have.property('error').to.be.a('function')
    expect(proto).to.have.property('logInfo').to.be.a('function')
    expect(proto).to.have.property('info').to.be.a('function')
    expect(proto).to.have.property('logWarn').to.be.a('function')
    expect(proto).to.have.property('warn').to.be.a('function')
    expect(proto).to.have.property('_logOptimize').to.be.a('function')
    expect(proto).to.have.property('setDebug').to.be.a('function')
    expect(proto).to.have.property('setLevel').to.be.a('function')
    expect(proto).to.have.property('setPrefix').to.be.a('function')
  })

  it('const logger_default = new Logger()', function () {
    expect(logger_default).to.be.an('object')
    expect(logger_default).to.have.property('debug').to.be.a('boolean').to.be.false
    expect(logger_default).to.have.property('logLevel').to.be.a('number').to.be.equal(2)
    expect(logger_default).to.have.property('logPrefix').to.be.a('string').to.be.equal('Peeler-Js')
    expect(logger_default).to.have.property('__proto__').to.be.an('object').to.be.equal(proto)
    expect(logger_default.log).to.be.an('function')
    expect(logger_default.detail).to.be.an('function')
    expect(logger_default.logErr).to.be.an('function')
    expect(logger_default.error).to.be.an('function')
    expect(logger_default.logInfo).to.be.an('function')
    expect(logger_default.info).to.be.an('function')
    expect(logger_default.logWarn).to.be.an('function')
    expect(logger_default.warn).to.be.an('function')
    expect(logger_default.setDebug).to.be.an('function')
    expect(logger_default.setLevel).to.be.an('function')
    expect(logger_default.setPrefix).to.be.an('function')
  })

  it('const logger_cutstom = new Logger(config)', function () {
    expect(logger_cutstom).to.be.an('object')
    expect(logger_cutstom).to.have.property('debug').to.be.a('boolean').to.be.true
    expect(logger_cutstom).to.have.property('logLevel').to.be.a('number').to.be.equal(0)
    expect(logger_cutstom).to.have.property('logPrefix').to.be.a('string').to.be.equal('CUSTOM')
    expect(logger_cutstom).to.have.property('__proto__').to.be.an('object').to.be.equal(proto)
    expect(logger_cutstom.log).to.be.an('function')
    expect(logger_cutstom.detail).to.be.an('function')
    expect(logger_cutstom.logErr).to.be.an('function')
    expect(logger_cutstom.error).to.be.an('function')
    expect(logger_cutstom.logInfo).to.be.an('function')
    expect(logger_cutstom.info).to.be.an('function')
    expect(logger_cutstom.logWarn).to.be.an('function')
    expect(logger_cutstom.warn).to.be.an('function')
    expect(logger_cutstom.setDebug).to.be.an('function')
    expect(logger_cutstom.setLevel).to.be.an('function')
    expect(logger_cutstom.setPrefix).to.be.an('function')
  })
})
