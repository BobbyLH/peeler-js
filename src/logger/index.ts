import isType from '../isType';
import getLocalDate from '../getLocalDate';

export type TlogLevel = number;
export type TlogLevelStr = 'detail' | 'info' | 'warn' | 'error' | 'silent';
export type TlogMsg = number | string | Record<string, any> | Array<any>;

export interface Config {
  debug?: boolean;
  logLevel?: TlogLevelStr;
  logPrefix?: string;
}

enum logLevelSet {
  'detail', 
  'info', 
  'warn', 
  'error', 
  'silent'
}

export class Logger {
  private debug: boolean | undefined;
  private logLevel: TlogLevel | undefined;
  private logPrefix: string | 'Peeler-Js';

  public constructor (config: Config = {}) {
    this.debug = config.debug || false;
    this.logLevel = +(config.logLevel && '' + logLevelSet[config.logLevel] || logLevelSet['warn']);
    this.logPrefix = config.logPrefix || 'Peeler-Js';
    this._logOptimize = this._logOptimize.bind(this);
  }

  public setPrefix (prefix: string) {
    if (prefix && typeof prefix === 'string') {
      this.logPrefix = prefix;
    }

    return this;
  }

  public setLevel (level: TlogLevelStr) {
    if (level && logLevelSet[level] !== void 0) {
      this.logLevel = logLevelSet[level];
    }

    return this;
  }

  public setDebug (isDebug: boolean) {
    if (typeof isDebug === 'boolean') {
      this.debug = isDebug;
    }

    return this;
  }

  /**
   * detail logger
   * @param {string | Record<string, any> | Array<any>} detail the log message
   * 
   * @return {void}
   */
  public detail (...detail: TlogMsg[]): void {
    const canLog: boolean = this.logLevel !== logLevelSet['silent'] && this.logLevel === logLevelSet['detail'];

    this.debug && canLog && this._logOptimize('log', ...detail);
  }

  public log (...detail: TlogMsg[]): void {
    this.detail(...detail);
  }

  /**
   * info logger
   * @param {string | Record<string, any> | Array<any>} info the log message
   * 
   * @return {void}
   */
  public info (...info: TlogMsg[]): void {
    const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'] && this.logLevel !== logLevelSet['warn'];

    this.debug && canLog && this._logOptimize('info', ...info);
  }

  public logInfo (...info: TlogMsg[]): void {
    this.info(...info);
  }

  /**
   * warn logger
   * @param {string | Record<string, any> | Array<any>} warn the warn log message
   * 
   * @return {void}
   */
  public warn (...warn: TlogMsg[]): void {
    const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'];

    this.debug && canLog && this._logOptimize('warn', ...warn);
  }

  public logWarn (...warn: TlogMsg[]): void {
    this.warn(...warn);
  }

  /**
   * error logger
   * @param {string | Record<string, any> | Array<any>} error the error log message
   * 
   * @return {void}
   */
  public error (...error: TlogMsg[]): void {
    const canLog = this.logLevel !== logLevelSet['silent'];

    this.debug && canLog && this._logOptimize('error', ...error);
  }

  public logErr (...error: TlogMsg[]): void {
    this.error(...error);
  }

  /**
   * console logger optimize
   * @param {string | Record<string, any> | Array<any>} msg the log message
   * @param {string} method the logger method in console Object
   * 
   * @return {void}
   */
  private _logOptimize (method: 'log' | 'info' | 'warn' | 'error', ...msg: TlogMsg[]): void {
    // eslint-disable-next-line no-console
    const logger: Function = console[method].bind(console) || console.log.bind(console);
    const prefix = `${method.toUpperCase()} [${this.logPrefix}]`;
    const canTable = msg.every(v => isType('object')(v) || isType('array')(v));
    try {
      if (console.table && canTable) {
        logger(`${prefix} (${getLocalDate()}):`);
        console.table(msg);
        return;
      }
    } catch (e) {}

    msg = msg.map(m => {
      if (isType('object')(m) || isType('array')(m)) {
        try {
          return JSON.stringify(m);
        } catch (e) {}
      }
      return m;
    });

    logger(`${prefix}:`, ...msg, `(${getLocalDate()})`);
  }
}

export default Logger;