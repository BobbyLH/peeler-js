import 'mocha'
import { expect } from 'chai'
import compare from '../'

describe("compare's test module", function () {
  it('NaN‘s are equal', function () {
    expect(compare(NaN, NaN)).to.be.true
  })
  it('String-numeric vs Number are not equal', function () {
    expect(compare('3', 3)).to.be.false
  })
  it('Same Function Shape are equal', function () {
    expect(compare(function () {console.log('test')}, function () {console.log('test')})).to.be.true
  })
  it('literal RegExp and new RegExp() are equal', function () {
    expect(compare(/\w{1,3}\s$/i, new RegExp('\\w{1,3}\\s$', 'i'))).to.be.true
  })
  it('new Number(33) vs 33 are equal', function () {
    expect(compare(33, new Number('33'))).to.be.true
  })
  it("new String(567) vs '567' are equal", function () {
    expect(compare('567', new String(567))).to.be.true
  })
  it("new Date('2018/5/12 08:00:32') vs new Date('2018/5/12 08:00:32') are equal", function () {
    expect(compare(new Date('2018/5/12 08:00:32'), new Date('2018/5/12 08:00:32'))).to.be.true
  })
  it("literal {} vs new Object() are equal", function () {
    expect(compare({}, new Object())).to.be.true
  })
  it("literal {} vs Object.create({}) are equal", function () {
    expect(compare({}, Object.create({}))).to.be.true
  })
  it("new Object() vs Object.create({}) are equal", function () {
    expect(compare(new Object(), Object.create({}))).to.be.true
  })
  it("literal [] vs new Array() are equal", function () {
    expect(compare([], new Array())).to.be.true
  })
  it("Same Shape Object but different Memory Address are equal", function () {
    const arr: any = ['test', 5, 6]
    const obj = { a: 12, b: 'test', c: function () { return 33 }, d: arr }
    arr.push(obj)
    const x = { ax: 1, bx: obj, cx: arr }
    const y = { ax: 1, bx: obj, cx: arr }
    expect(compare(x, y)).to.be.true
  })
})