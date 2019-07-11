import 'mocha'
import { expect } from 'chai'
import timeslice from '../'

describe('timeslice\'s test module', function () {
  it('timeslice is a function', function () {
    expect(timeslice).to.be.a('function')
  })

  it('call timeslice return a promise', function (done) {
    function* gen () {
      const arr: number[] = Array.apply(null, ({ length: 50000 } as any)).map((v: unknown, k: number) => k)
      const len = arr.length
      for (let i = 0; i < len; i++) {
        if (arr[i] % 5000 === 0) {
          console.info(arr[i])
        }
        yield
      }
      done()
    }
    expect(timeslice(gen as any)).to.be.a('promise')
  })
})