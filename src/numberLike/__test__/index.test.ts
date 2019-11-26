import 'mocha'
import { expect } from 'chai'
import { isNumberLike, toNumberLike } from '../'

describe("numberLike's test module", function () {
  it('isNumberLike and toNumberLike are functions', function () {
    expect(isNumberLike).to.be.a('function');
    expect(toNumberLike).to.be.a('function');
  })

  it("isNumberLike's test module", function () {
    expect(isNumberLike(null)).to.be.false;
    expect(isNumberLike(undefined)).to.be.false;
    expect(isNumberLike('')).to.be.false;
    expect(isNumberLike('    ')).to.be.false;
    expect(isNumberLike(false)).to.be.false;
    expect(isNumberLike(true)).to.be.false;
    expect(isNumberLike('0')).to.be.true;
    expect(isNumberLike(0)).to.be.true;
    expect(isNumberLike('123')).to.be.true;
    expect(isNumberLike(555)).to.be.true;
    expect(isNumberLike('xiachedan')).to.be.false;
    expect(isNumberLike('瞎扯蛋')).to.be.false;
  })

  it("toNumberLike's test module", function () {
    expect(toNumberLike(null)).to.be.equal(null);
    expect(toNumberLike(undefined)).to.be.equal(undefined);
    expect(toNumberLike('')).to.be.equal('');
    expect(toNumberLike('    ')).to.be.equal('    ');
    expect(toNumberLike(false)).to.be.equal(false);
    expect(toNumberLike(true)).to.be.equal(true);
    expect(toNumberLike('0')).to.be.equal(0);
    expect(toNumberLike(0)).to.be.equal(0);
    expect(toNumberLike('123')).to.be.equal(123);
    expect(toNumberLike(555)).to.be.equal(555);
    expect(toNumberLike('xiachedan')).to.be.equal('xiachedan');
    expect(toNumberLike('瞎扯蛋')).to.be.equal('瞎扯蛋');
  })
})
