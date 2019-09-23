import 'mocha'
import { expect } from 'chai'
import storage from '../'

describe('storage\'s test module', function () {
  it('storage is a object', function () {
    expect(storage).to.be.an('object')
    expect(storage).to.have.property('get').to.be.a('function')
    expect(storage).to.have.property('set').to.be.a('function')
    expect(storage).to.have.property('clear').to.be.a('function')
  })

  if (typeof window === 'undefined') {
    it('call storage in node env', function () {
      expect(storage.set('test', '123')).to.be.false
      expect(storage.get('test')).to.be.equal(null)
      expect(storage.clear('test')).to.be.false
    })
  } else {
    it('call storage in browser env - without params', function (done) {
      expect(storage.set('test', '123')).to.be.true
      expect(storage.get('test')).to.be.equal('123')
      expect(storage.clear('test')).to.be.true
      done()
    })
    it('call storage in browser env - cookie', function (done) {
      expect(storage.set('test', '456', 'cookie', { domain: 'localhost', expires: 10000 })).to.be.true
      expect(storage.get('test', 'cookie')).to.be.equal('456')
      expect(storage.clear('test', 'cookie', 'localhost')).to.be.true
      done()
    })
    it('call storage in browser env - localStorage', function (done) {
      expect(storage.set('test', '789', 'localStorage')).to.be.true
      expect(storage.get('test', 'localStorage')).to.be.equal('789')
      expect(storage.clear('test', 'localStorage')).to.be.true
      done()
    })
    it('call storage in browser env - sessionStorage', function (done) {
      expect(storage.set('test', '999', 'sessionStorage')).to.be.true
      expect(storage.get('test', 'sessionStorage')).to.be.equal('999')
      expect(storage.clear('test', 'sessionStorage')).to.be.true
      done()
    })
  }
})