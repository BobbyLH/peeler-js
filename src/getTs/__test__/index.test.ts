import 'mocha'
import { expect } from 'chai'
import getTs from '../'

describe('getTs\'s test module', function () {
  it('getTs is a function', function () {
    expect(getTs).to.be.a('function')
  })
  it('call getTs return a timestamp', function () {
    expect(getTs()).to.be.a('number')
  })
})