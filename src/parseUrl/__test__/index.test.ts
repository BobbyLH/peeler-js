import 'mocha'
import { expect } from 'chai'
import parseUrl from '../'

describe('parseUrl\'s test module', function () {
  it('parseUrl is a function', function () {
    expect(parseUrl).to.be.a('function')
  })
  const url = 'https://www.baidu.com:3020/test/user?uid=55598&tid=12345#20Addon%20'
  if (typeof window === 'undefined') {
    it('call parseUrl in node env', function () {
      expect(parseUrl(url)).to.be.equal(url)
    })
  } else {
    it('call parseUrl in browser env', function () {
      const parseParams = parseUrl(url)
      expect(parseParams).to.be.an('object')
      expect(parseParams).to.have.property('hash').to.equal('#20Addon%20')
      expect(parseParams).to.have.property('host').to.equal('www.baidu.com:3020')
      expect(parseParams).to.have.property('hostname').to.equal('www.baidu.com')
      expect(parseParams).to.have.property('href').to.equal(url)
      expect(parseParams).to.have.property('origin').to.equal('https://www.baidu.com:3020')
      expect(parseParams).to.have.property('pathname').to.equal('/test/user')
      expect(parseParams).to.have.property('port').to.equal('3020')
      expect(parseParams).to.have.property('protocol').to.equal('https:')
      expect(parseParams).to.have.property('search').to.equal('?uid=55598&tid=12345')
    })
  }

})