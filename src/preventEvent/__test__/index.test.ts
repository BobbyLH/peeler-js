import 'mocha'
import { expect } from 'chai'
import preventEvent from '../'

describe("preventEvent's test module", function () {
  it('preventEvent is a function', function () {
    expect(preventEvent).to.be.a('function')
  })
})