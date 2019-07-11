import 'mocha'
import { expect } from 'chai'
import getCookie from '../'

describe("getCookie's test module", function () {
  it('getCookie is a function', function () {
    expect(getCookie).to.be.a('function')
  })

  it('get cookie by name', function () {
    const cookie = "locale=en_US; hit3=true; _fbp=fb.1.1554280598122.664224850; _ga=GA1.2.840616006.1554280598; login_type=EMAIL; __stripe_mid=f7c25a45-cb1b-409b-bf54-b8e4bb52f19b; countryId=4; countryCode=us; _gid=GA1.2.1257249366.1555295139; 4&remember_me=n; 4&_token=71778&9a300dbc0f965040e408df300052f01fcbb8; 4_l_flag=71778&9a300dbc0f965040e408df300052f01fcbb8_1555295145788; __stripe_sid=1c406824-e809-4353-addc-005c52c8b188"
    expect(getCookie('login_type', cookie)).to.be.equal('EMAIL')
  })
})
