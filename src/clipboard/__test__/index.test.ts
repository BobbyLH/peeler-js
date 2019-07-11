import 'mocha'
import { expect } from 'chai'
import clipboard from '../'

describe("clipboard's test module", function () {
  it('clipboard is a function', function () {
    expect(clipboard).to.be.a('function')
  })

  it('clipboard return value is undefined', function () {
    expect(clipboard(567, function (succeeded) {
      expect(succeeded).to.be.a('boolean')
    })).to.be.undefined
  })

  it('clipboard callback', function () {
    clipboard('copy message', function (succeeded) {
      expect(succeeded).to.be.a('boolean')
    })
  })
})