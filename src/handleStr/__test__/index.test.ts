import 'mocha';
import { expect } from 'chai';
import { firstLetter, lastLetter } from '../';

describe("handleStr's test module", function () {
  it('firstLetter is a function', function () {
    expect(firstLetter).to.be.a('function');
  });
  it('lastLetter is a function', function () {
    expect(lastLetter).to.be.a('function');
  });

  it('call firstLetter without any options will return a first letter string', function () {
    expect(firstLetter('first')).to.be.equal('f');
  });
  it('call firstLetter with some options', function () {
    expect(firstLetter('first', {
      include: false
    })).to.be.equal('irst');
    expect(firstLetter('first', {
      case: 'upper'
    })).to.be.equal('First');
    expect(firstLetter('FIRST', {
      case: 'lower'
    })).to.be.equal('fIRST');
  });

  it('call lastLetter without any options will return a last letter uppercase string', function () {
    expect(lastLetter('last')).to.be.equal('t');
  });
  it('call lastLetter with some options', function () {
    expect(firstLetter('last', {
      include: false
    })).to.be.equal('ast');
    expect(firstLetter('last', {
      case: 'upper'
    })).to.be.equal('Last');
    expect(firstLetter('LAST', {
      case: 'lower'
    })).to.be.equal('lAST');
  });
})
