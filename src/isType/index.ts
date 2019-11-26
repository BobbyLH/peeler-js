interface AnyObject {
  [propsName: string]: any;
}

export interface IGeneratorFn extends GeneratorFunction {
  readonly [Symbol.toStringTag]: 'GeneratorFunction';
  (): IterableIterator<any>;
}

const gen = function *() {
  yield;
};
let args: IArguments;
(function () { args = arguments; })();

interface IsType {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  undefined: undefined | void;
  symbol: symbol;
  array: any[];
  arguments: IArguments;
  object: AnyObject;
  regexp: RegExp;
  date: Date;
  function: Function;
  promise: Promise<void>;
  generatorfunction: GeneratorFunction;
  generator: Generator;
  asyncfunction: () => Promise<void>;
}

const typeMap: IsType = {
  string: '',
  number: 1,
  boolean: true,
  null: null,
  undefined: undefined,
  symbol: Symbol(1),
  array: [],
  arguments: args,
  object: {},
  regexp: /regexp/,
  date: new Date(),
  function: function () {},
  promise: Promise.resolve(void(0)),
  generatorfunction: gen as IGeneratorFn,
  generator: gen(),
  asyncfunction: async () => {}
};

/**
 * judgement ele type
 * @param {string} type the string of ele type for judgement
 * @param {any} ele the target element
 * @return {boolean} whether or not ele pair with type
 */
export function isType <T extends keyof IsType>(type: T) {
  const typeInstance = typeMap[type];
  return function (ele: any): ele is typeof typeInstance {
    if (typeof ele !== 'object') return typeof ele === type.toLowerCase();
    const len = Object.prototype.toString.call(ele).length - 1;
    return Object.prototype.toString.call(ele).slice(8, len).toLowerCase() === type.toLowerCase();
  };
}
export default isType;
