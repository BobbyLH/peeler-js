import 'mocha'
import { expect } from 'chai'
import getType from '../'

describe('getType\'s test module', function () {
  it('getType - string', function () {
    expect(getType('test')).to.be.equal('string')
    expect(getType(new String(123))).to.be.equal('string')
  })
  it('getType - number', function () {
    expect(getType(123)).to.be.equal('number')
    expect(getType(new Number(123))).to.be.equal('number')
  })
  it('getType - boolean', function () {
    expect(getType(false)).to.be.equal('boolean')
    expect(getType(new Boolean(1))).to.be.equal('boolean')
  })
  it('getType - null', function () {
    expect(getType(null)).to.be.equal('null')
  })
  it('getType - undefined', function () {
    expect(getType(undefined)).to.be.equal('undefined')
  })
  it('getType - symbol', function () {
    expect(getType(Symbol(123))).to.be.equal('symbol')
  })
  it('getType - function', function () {
    expect(getType(function () {})).to.be.equal('function')
    expect(getType(() => {})).to.be.equal('function')
    expect(getType(new Function())).to.be.equal('function')
  })
  it('getType - array', function () {
    expect(getType([])).to.be.equal('array')
    expect(getType(new Array(0))).to.be.equal('array')
  })
  it('getType - date', function () {
    expect(getType(new Date())).to.be.equal('date')
  })
  it('getType - regexp', function () {
    expect(getType(/test/)).to.be.equal('regexp')
    expect(getType(new RegExp('test'))).to.be.equal('regexp')
  })
  it('getType - object', function () {
    expect(getType({})).to.be.equal('object')
    expect(getType(new Object())).to.be.equal('object')
    expect(getType(Object.create(null))).to.be.equal('object')
  })
})
