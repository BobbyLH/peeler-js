import 'mocha'
import { expect } from 'chai'
import addListener from '../'

export function handleLoad (cb?: (e: Event) => any) {
  return function onload (e: Event) {
    console.log('handleLoad', e.type)
    cb && cb(e)
  }
}

describe('addListener\'s test module', function () {
  it('addListener is a function', function () {
    expect(addListener).to.be.a('function')
  })

  it('invoke addListener', function () {
    if (typeof window !== 'undefined') {
      addListener('load', handleLoad(function (e) {
        expect(e.type).to.be.a('string').to.equal('load')
      }), window)
    }
  })
})