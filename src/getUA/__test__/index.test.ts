import 'mocha'
import { expect } from 'chai'
import getUA from '../'

describe("getUA's test module", function () {
  const webua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
  const mobua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
  const mobua_adr = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
  const ua_web = getUA(webua)
  const ua_mob = getUA(mobua)
  const ua_mob_adr = getUA(mobua_adr)
  it('getUA return is an object', function () {
    expect(ua_web).to.be.an('object')
    expect(ua_mob).to.be.an('object')
    expect(ua_mob_adr).to.be.an('object')
  })
  it('different web with mobile', function () {
    expect(ua_web['isMobile']).to.be.false
    expect(ua_web['isMac']).to.be.true

    expect(ua_mob['isMobile']).to.be.true
    expect(ua_mob['isIOS']).to.be.true

    expect(ua_mob_adr['isMobile']).to.be.true
    expect(ua_mob_adr['isAndroid']).to.be.true

    expect(ua_mob_adr['isIphoneX']).to.be.false
    expect(ua_mob_adr['isIPhoneXR']).to.be.false
    expect(ua_mob_adr['isIPhoneXSMax']).to.be.false
  })
})
