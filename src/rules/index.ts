const regExpCollection = {
  /* eslint-disable no-useless-escape */
  phone_cn: /^(1([3|4|5|6|7|8|9][0-9]))[0-9]{8}$/, // chinese phone number
  mail: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  numeral: (digit: number) => new RegExp(`^\\d{${digit}}$`),
  integer: /^-?[1-9]\d*$/, // interger
  integerP: /^[1-9]\d*$/, // positive interger
  integerN: /^-[1-9]\d*$/, // negative interger
  num: /^([+-]?)\d*\.?\d+$/, // number
  numP: /^[1-9]\d*|0$/, // positive + 0
  numN: /^-[1-9]\d*|0$/, // negative + 0）
  decimal: /^([+-]?)\d*\.\d+$/, // float
  decimal1: /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/, // positive float
  decimal2: /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/, // negative float
  decimal3: /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/, // float + 0
  decimal4: /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/, // positive float + 0
  decimal5: /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/, // negative float + 0
  color_hex: /^\#[a-fA-F0-9]{6}$/, // 颜色
  url: /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w\-.\/\?\%\&\=\#]*)?$/, // url
  chinese: /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/, // just chinese
  include_chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]+/g, // include chinese
  ascii: /^[\x00-\xFF]+$/, // just ACSII
  zipcode: /^\d{6}$/, // zip code
  ip4: /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/, // ip 4
  notempty: /^\S+$/, // empty
  picture: /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/, // picture
  rar: /(.*)\.(rar|zip|7zip|tgz)$/, // rar
  date: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/, // date
  letter: /^[A-Za-z]+$/, // letter
  letter_u: /^[A-Z]+$/, // uppercase
  letter_l: /^[a-z]+$/, // lowercase
  id_card_china_mainland: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d| 3[01])\d{3}(\d|[xX])$/,
  id_card_china_hk: /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([\dAa]\)|[0-9Aa])$/,
  id_card_china_taiwan: /^[a-zA-Z][0-9]{9}$/,
  id_card_china_macau: /^[1|5|7][0-9]{6}\([0-9Aa]\)/,
  /* eslint-enable no-useless-escape */
};

function validate (regName: Exclude<keyof typeof regExpCollection, 'numeral'>) {
  return function (str: string | number) {
    if (regName === 'include_chinese') {
      return /[\u4E00-\u9FA5\uF900-\uFA2D]+/g.test('' + str);
    }
    return regExpCollection[regName].test('' + str);
  };
}

export const rules = {
  phone_cn: validate('phone_cn'),
  numeral: function (str: string | number, digit: number): boolean {
    return regExpCollection.numeral(digit).test('' + str);
  },
  number: function (str: string | number, sign?: 'p' | 'n'): boolean {
    if (sign) {
      return sign === 'n' ? validate('numN')(str) : validate('numP')(str);
    }
    return validate('num')(str);
  },
  integer: function (str: string | number, sign?: 'p' | 'n'): boolean {
    if (sign) {
      return sign === 'n' ? validate('integerN')(str) : validate('integerP')(str);
    }
    return validate('integer')(str);
  },
  decimal: function (str: string | number, sign?: 'p' | 'n'): boolean {
    if (sign) {
      return sign === 'n' ? validate('decimal2')(str) : validate('decimal1')(str);
    }
    return validate('decimal')(str);
  },
  color_hex: validate('color_hex'),
  url: validate('url'),
  chinese: validate('chinese'),
  include_chinese: validate('include_chinese'),
  ascii: validate('ascii'),
  zipcode: validate('zipcode'),
  ip4: validate('ip4'),
  notempty: validate('notempty'),
  picture: validate('picture'),
  rar: validate('rar'),
  date: validate('date'),
  letter: function (str: string | number, capital?: 'l' | 'u'): boolean {
    if (capital) {
      return capital === 'l' ? validate('letter_l')(str) : validate('letter_u')(str);
    }
    return validate('letter')(str);
  },
  id_card_cn: function (id: string | number, region: 'mainland' | 'hk' | 'taiwan' | 'macau' = 'mainland'): boolean {
    const regName = `id_card_china_${region}` as 'id_card_china_mainland' | 'id_card_china_hk' | 'id_card_china_taiwan' | 'id_card_china_macau';
    return validate(regName)(id);
  }
};

export default rules;