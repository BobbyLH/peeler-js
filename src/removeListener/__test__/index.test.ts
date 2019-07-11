import 'mocha'
import { expect } from 'chai'
import removeListener from '../'
import { handleLoad } from '../../addListener/__test__/index.test'

describe('removeListener\'s test module', function () {
  it('removeListener is a function', function () {
    expect(removeListener).to.be.a('function')
  })

  it('invoke removeListener', function () {
    if (typeof window !== 'undefined') {
      removeListener('load', handleLoad(function (e) {
        expect(e.type).to.be.a('string').to.equal('load')
      }), window)
    }
  })
})