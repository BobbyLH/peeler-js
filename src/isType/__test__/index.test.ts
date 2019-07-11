import 'mocha'
import { expect } from 'chai'
import isType from '../'

describe('isType\'s test module', function () {
  it('isType - string', function () {
    expect(isType('string')('test')).to.be.true
    expect(isType('string')(new String(123))).to.be.true
  })
  it('isType - number', function () {
    expect(isType('number')(123)).to.be.true
    expect(isType('number')(new Number(123))).to.be.true
  })
  it('isType - boolean', function () {
    expect(isType('boolean')(false)).to.be.true
    expect(isType('boolean')(new Boolean(1))).to.be.true
  })
  it('isType - null', function () {
    expect(isType('null')(null)).to.be.true
  })
  it('isType - undefined', function () {
    expect(isType('undefined')(undefined)).to.be.true
  })
  it('isType - symbol', function () {
    expect(isType('symbol')(Symbol(123))).to.be.true
  })
  it('isType - function', function () {
    expect(isType('function')(function () {})).to.be.true
    expect(isType('function')(() => {})).to.be.true
    expect(isType('function')(new Function())).to.be.true
  })
  it('isType - array', function () {
    expect(isType('array')([])).to.be.true
    expect(isType('array')(new Array(0))).to.be.true
  })
  it('isType - date', function () {
    expect(isType('date')(new Date())).to.be.true
  })
  it('isType - regexp', function () {
    expect(isType('regexp')(/test/)).to.be.true
    expect(isType('regexp')(new RegExp('test'))).to.be.true
  })
  it('isType - object', function () {
    expect(isType('object')({})).to.be.true
    expect(isType('object')(new Object())).to.be.true
    expect(isType('object')(Object.create(null))).to.be.true
  })
})