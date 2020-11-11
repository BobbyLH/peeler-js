# peeler-js (The utils work for typescript and javascript)

[![NPM downloads](http://img.shields.io/npm/dm/peeler-js.svg?style=flat-square)](https://www.npmjs.com/package/peeler-js)
[![npm version](https://badge.fury.io/js/peeler-js.svg)](https://badge.fury.io/js/peeler-js)
[![Build Status](https://travis-ci.com/BobbyLH/peeler-js.svg?branch=master)](https://travis-ci.com/BobbyLH/peeler-js)
[![codecov](https://codecov.io/gh/BobbyLH/peeler-js/branch/master/graph/badge.svg)](https://codecov.io/gh/BobbyLH/peeler-js)
[![install size](https://packagephobia.now.sh/badge?p=peeler-js)](https://packagephobia.now.sh/result?p=peeler-js)
[![license](http://img.shields.io/npm/l/peeler-js.svg)](https://github.com/BobbyLH/peeler-js/blob/master/LICENSE)

* Clone the repo: `git clone git@github.com:BobbyLH/peeler-js.git`
* Install with [npm](https://www.npmjs.com/package/roarjs): `npm install peeler-js -S`
* Install with [Yarn](https://yarnpkg.com/en/package/roarjs): `yarn add peeler-js`


## APIs
### addListener(event, fn, dom option?)
compat addEventListener and attachEvent.

### clipboard()
copy text.

### compare()
compare any element.

### compatCheck()
compat check.

### getCookie()
get cookie.

### getLocalDate()
get local date

### getTs()
compat timestamp.

### getType()
get element type.

### getUA()
handle userAgent.

### firstLetter(str, [option])
tackle the string's first letter.

### lastLetter(str, [option])
tackle the string's last letter.

### isType()
judgement element type.

### listenKeyboard(dom, onRise({isIOS, isAndroid}), onFold({isIOS, isAndroid}))
mock listening keyboard rise or fold event for IOS and Android system.

### clearKeyboardListener(dom)
clear listening keyboard event.

### new Logger()
Logger class.

### isNumLike()
judgement whether or not number-like value.

### numLikeToNum()
transform number-like value to number value.

### parseUrl()
parse url.

### preventEvent()
compat prevent event.

### removeListener()
compat removeEventListener and detachEvent.

### stopEvent()
compat stop event.

### storage()
handle cookie localstorge sessionstorage.

### rules
some rules(below) for string or number validate.
#### phone(val)
#### numeral(val, digit)
#### number(val, sign?)
#### integer(val, sign?)
#### decimal(val, sign?)
#### color_hex(val)
#### url(val)
#### chinese(val)
#### include_chinese(val)
#### ascii(val)
#### zipcode(val)
#### ip4(val)
#### notempty(val)
#### picture(val)
#### rar(val)
#### date(val)
#### letter(val, capital?)

### timeslice()
timeslice.

### uuid()
generate uuid.


## License

Copyright (c) 2019 Bobby.li

Released under the MIT License