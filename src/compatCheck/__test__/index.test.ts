import 'mocha'
import { expect } from 'chai'
import compatCheck from '../'

describe('compatCheck\'s test module', function () {
  it('compatCheck is a function', function () {
    expect(compatCheck).to.be.a('function')
  })
  it('call compatCheck return boolean', function () {
    expect(compatCheck('promise')).to.be.true
    expect(compatCheck('generator')).to.be.true
    expect(compatCheck('async')).to.be.true
  })
})