import 'mocha'
import { expect } from 'chai'
import getLocalDate from '../'

describe('getLocalDate\'s test module', function () {
  it('getLocalDate is a function', function () {
    expect(getLocalDate).to.be.a('function')
  })
  it('call getLocalDate return a local date string', function () {
    expect(getLocalDate()).to.be.a('string')
  })
})