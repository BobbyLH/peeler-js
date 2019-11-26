import 'mocha'
import { expect } from 'chai'
import { isNumLike, numLikeToNum } from '../'

describe("numberLike's test module", function () {
  it('isNumLike and numLikeToNum are functions', function () {
    expect(isNumLike).to.be.a('function');
    expect(numLikeToNum).to.be.a('function');
  })

  it("isNumLike's test module", function () {
    expect(isNumLike(null)).to.be.false;
    expect(isNumLike(undefined)).to.be.false;
    expect(isNumLike('')).to.be.false;
    expect(isNumLike('    ')).to.be.false;
    expect(isNumLike(false)).to.be.false;
    expect(isNumLike(true)).to.be.false;
    expect(isNumLike('0')).to.be.true;
    expect(isNumLike(0)).to.be.true;
    expect(isNumLike('123')).to.be.true;
    expect(isNumLike(555)).to.be.true;
    expect(isNumLike('xiachedan')).to.be.false;
    expect(isNumLike('瞎扯蛋')).to.be.false;
  })

  it("numLikeToNum's test module", function () {
    expect(numLikeToNum(null)).to.be.equal(null);
    expect(numLikeToNum(undefined)).to.be.equal(undefined);
    expect(numLikeToNum('')).to.be.equal('');
    expect(numLikeToNum('    ')).to.be.equal('    ');
    expect(numLikeToNum(false)).to.be.equal(false);
    expect(numLikeToNum(true)).to.be.equal(true);
    expect(numLikeToNum('0')).to.be.equal(0);
    expect(numLikeToNum(0)).to.be.equal(0);
    expect(numLikeToNum('123')).to.be.equal(123);
    expect(numLikeToNum(555)).to.be.equal(555);
    expect(numLikeToNum('xiachedan')).to.be.equal('xiachedan');
    expect(numLikeToNum('瞎扯蛋')).to.be.equal('瞎扯蛋');
  })
})
