import 'mocha'
import { expect } from 'chai'
import stopEvent from '../'

describe("stopEvent's test module", function () {
  it('stopEvent is a function', function () {
    expect(stopEvent).to.be.a('function')
  })
})