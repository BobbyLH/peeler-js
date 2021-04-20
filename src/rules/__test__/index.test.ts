import 'mocha'
import { expect } from 'chai'
import rules from '../';
const {
  phone_cn,
  numeral,
  number,
  integer,
  decimal,
  color_hex,
  url,
  chinese,
  include_chinese,
  ascii,
  zipcode,
  ip4,
  notempty,
  picture,
  rar,
  date,
  letter,
  id_card_cn
} = rules

describe("rules' test module", function () {
  it('all export are function', function () {
    expect(phone_cn).to.be.a('function');
    expect(numeral).to.be.a('function');
    expect(number).to.be.a('function');
    expect(integer).to.be.a('function');
    expect(decimal).to.be.a('function');
    expect(color_hex).to.be.a('function');
    expect(url).to.be.a('function');
    expect(chinese).to.be.a('function');
    expect(include_chinese).to.be.a('function');
    expect(ascii).to.be.a('function');
    expect(zipcode).to.be.a('function');
    expect(ip4).to.be.a('function');
    expect(notempty).to.be.a('function');
    expect(picture).to.be.a('function');
    expect(rar).to.be.a('function');
    expect(date).to.be.a('function');
    expect(letter).to.be.a('function');
  });

  it("phone_cn's test module", function () {
    expect(phone_cn(13448932726)).to.be.true;
    expect(phone_cn('13448932726')).to.be.true;
    expect(phone_cn(12345678901)).to.be.false;
    expect(phone_cn('12345678901')).to.be.false;
    expect(phone_cn('    ')).to.be.false;
    expect(phone_cn('0')).to.be.false;
    expect(phone_cn(0)).to.be.false;
    expect(phone_cn('123')).to.be.false;
    expect(phone_cn(555)).to.be.false;
    expect(phone_cn('xiachedan555')).to.be.false;
    expect(phone_cn('瞎扯蛋')).to.be.false;
  });

  it("numeral's test module", function () {
    expect(numeral(13448932726, 11)).to.be.true;
    expect(numeral('13448932726', 11)).to.be.true;
    expect(numeral(12345678901, 10)).to.be.false;
    expect(numeral('12345678901', 10)).to.be.false;
  });

  it("number's test module", function () {
    expect(number(123)).to.be.true;
    expect(number('123')).to.be.true;
    expect(number(123, 'p')).to.be.true;
    expect(number(-123, 'p')).to.be.false;
    expect(number(123, 'n')).to.be.false;
    expect(number(-123, 'n')).to.be.true;
    expect(number('    ')).to.be.false;
    expect(number('123xiachedan555')).to.be.false;
    expect(number('瞎扯蛋')).to.be.false;
  });

  it("integer's test module", function () {
    expect(integer(555)).to.be.true;
    expect(integer('555')).to.be.true;
    expect(integer(555.5)).to.be.false;
    expect(integer(123, 'p')).to.be.true;
    expect(integer(-123, 'p')).to.be.false;
    expect(integer(-567, 'n')).to.be.true;
    expect(integer(567, 'n')).to.be.false;
  });

  it("decimal's test module", function () {
    expect(decimal(555.5)).to.be.true;
    expect(decimal('555.5')).to.be.true;
    expect(decimal(555)).to.be.false;
    expect(decimal(123.3, 'p')).to.be.true;
    expect(decimal(-123.3, 'p')).to.be.false;
    expect(decimal(-567.0, 'n')).to.be.true;
    expect(decimal(567.0, 'n')).to.be.false;
  });

  it("color_hex's test module", function () {
    expect(color_hex(555.5)).to.be.false;
    expect(color_hex('555.5')).to.be.false;
    expect(color_hex('#000000')).to.be.true;
    expect(color_hex('#FFFFFF')).to.be.true;
    expect(color_hex('#ffffff')).to.be.true;
    expect(color_hex('#fff')).to.be.false;
  });

  it("url's test module", function () {
    expect(url(555.5)).to.be.false;
    expect(url('555.5')).to.be.false;
    expect(url('http://www.google.com')).to.be.true;
    expect(url('https://www.google.com')).to.be.true;
    expect(url('www.google.com')).to.be.false;
  });

  it("chinese's test module", function () {
    expect(chinese(555.5)).to.be.false;
    expect(chinese('555.5')).to.be.false;
    expect(chinese('你是猪')).to.be.true;
    expect(chinese('狗B')).to.be.false;
    expect(chinese('傻13')).to.be.false;
  });

  it("include_chinese's test module", function () {
    expect(include_chinese(555.5)).to.be.false;
    expect(include_chinese('555.5')).to.be.false;
    expect(include_chinese('你是猪')).to.be.true;
    expect(include_chinese('狗B')).to.be.true;
    expect(include_chinese('傻13')).to.be.true;
  });

  it("ascii's test module", function () {
    expect(ascii(555.5)).to.be.true;
    expect(ascii('555.5')).to.be.true;
    expect(ascii('你')).to.be.false;
    expect(ascii('B')).to.be.true;
  });

  it("zipcode's test module", function () {
    expect(zipcode(555.5)).to.be.false;
    expect(zipcode('555.5')).to.be.false;
    expect(zipcode('552211')).to.be.true;
    expect(zipcode(552211)).to.be.true;
  });

  it("ip4's test module", function () {
    expect(ip4(555.5)).to.be.false;
    expect(ip4('555.5')).to.be.false;
    expect(ip4('192.160.0.1')).to.be.true;
  });

  it("notempty's test module", function () {
    expect(notempty(555.5)).to.be.true;
    expect(notempty('555.5')).to.be.true;
    expect(notempty(0)).to.be.true;
    expect(notempty('')).to.be.false;
    expect(notempty('   ')).to.be.false;
  });

  it("picture's test module", function () {
    expect(picture(555.5)).to.be.false;
    expect(picture('555.5')).to.be.false;
    expect(picture('123.rar')).to.be.false;
    expect(picture('123.gif')).to.be.true;
    expect(picture('123.png')).to.be.true;
  });

  it("rar's test module", function () {
    expect(rar(555.5)).to.be.false;
    expect(rar('555.5')).to.be.false;
    expect(rar('123.gif')).to.be.false;
    expect(rar('123.rar')).to.be.true;
    expect(rar('123.zip')).to.be.true;
    expect(rar('123.7zip')).to.be.true;
    expect(rar('123.tgz')).to.be.true;
  });

  it("date's test module", function () {
    expect(date(555.5)).to.be.false;
    expect(date('555.5')).to.be.false;
    expect(date('2014.09.15')).to.be.true;
  });

  it("letter's test module", function () {
    expect(letter(555.5)).to.be.false;
    expect(letter('555.5')).to.be.false;
    expect(letter('abc')).to.be.true;
    expect(letter('ABC')).to.be.true;
    expect(letter('aBc')).to.be.true;
    expect(letter('abc', 'l')).to.be.true;
    expect(letter('Abc', 'l')).to.be.false;
    expect(letter('ABC', 'l')).to.be.false;
    expect(letter('ABC', 'u')).to.be.true;
    expect(letter('aBC', 'u')).to.be.false;
    expect(letter('abc', 'u')).to.be.false;
  });

  it("id_card_cn's mainland test module", function () {
    expect(id_card_cn(666.6)).to.be.false;
    expect(id_card_cn('666.6')).to.be.false;
    expect(id_card_cn('abc')).to.be.false;

    expect(id_card_cn(500212199303212875)).to.be.true;
    expect(id_card_cn('500212199303212875')).to.be.true;
    expect(id_card_cn('50021219930321287X')).to.be.true;
    expect(id_card_cn('50021219930321287x')).to.be.true;

    expect(id_card_cn('500212169303212875')).to.be.false;
    expect(id_card_cn('500212199313212875')).to.be.false;
    expect(id_card_cn('500212199303512875')).to.be.false;
    expect(id_card_cn('50021219930321287Y')).to.be.false;
  });

  it("id_card_cn's hk test module", function () {
    expect(id_card_cn('F552773(7)', 'hk')).to.be.true;
    expect(id_card_cn('Cv668648a', 'hk')).to.be.true;
    expect(id_card_cn('C668668A', 'hk')).to.be.true;
    expect(id_card_cn('C668668', 'hk')).to.be.false;
  });

  it("id_card_cn's taiwan test module", function () {
    expect(id_card_cn('K183889052', 'taiwan')).to.be.true;
    expect(id_card_cn('C668668', 'taiwan')).to.be.false;
  });

  it("id_card_cn's macau test module", function () {
    expect(id_card_cn('1366234(6)', 'macau')).to.be.true;
    expect(id_card_cn('1366234', 'macau')).to.be.false;
  });
})
