import 'mocha'
import { expect } from 'chai'
import uuid from '..'


describe('uuid\'s test module', function () {
  it('uuid is a function', function () {
    expect(uuid).to.be.a('function')
  })
  it('call uuid return a uuid', function () {
    expect(uuid()).to.be.a('string').to.be.lengthOf(36)
  })
})