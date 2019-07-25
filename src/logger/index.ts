import isType from '../isType';

type TlogLevel = number;
type TlogLevelStr = 'detail' | 'info' | 'warn' | 'error' | 'silent';
type TlogMsg = string | Record<string, any> | Array<any>;

interface Config {
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
    this.logLevel = +(config.logLevel && '' + logLevelSet[config.logLevel] || logLevelSet['error']);
    this.logPrefix = config.logPrefix || 'Peeler-Js';
  }

  /**
   * detail logger
   * @param {string | Record<string, any> | Array<any>} detail the log message
   * 
   * @return {void}
   */
  public log (detail: TlogMsg): void {
    const canLog: boolean = this.logLevel !== logLevelSet['silent'] && this.logLevel === logLevelSet['detail']

    this.debug && canLog && this._logOptimize(detail, 'log')
  }

  /**
   * info logger
   * @param {string | Record<string, any> | Array<any>} info the log message
   * 
   * @return {void}
   */
  public logInfo (info: TlogMsg): void {
    const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'] && this.logLevel !== logLevelSet['warn']

    this.debug && canLog && this._logOptimize(info, 'info')
  }

  /**
   * warn logger
   * @param {string | Record<string, any> | Array<any>} warn the warn log message
   * 
   * @return {void}
   */
  public logWarn (warn: TlogMsg): void {
    const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error']

    this.debug && canLog && this._logOptimize(warn, 'warn')
  }

  /**
   * error logger
   * @param {string | Record<string, any> | Array<any>} error the error log message
   * 
   * @return {void}
   */
  public logErr (error: TlogMsg): void {
    const canLog = this.logLevel !== logLevelSet['silent']

    this.debug && canLog && this._logOptimize(error, 'error')
  }

  /**
   * console logger optimize
   * @param {string | Record<string, any> | Array<any>} msg the log message
   * @param {string} method the logger method in console Object
   * 
   * @return {void}
   */
  private _logOptimize (msg: TlogMsg, method: 'log' | 'info' | 'warn' | 'error'): void {
    const logger: Function = console[method] || console.log
    const prefix = `[${this.logPrefix} ${method.toUpperCase()}]:`

    if ((isType('object')(msg) || isType('array')(msg)) && console.table) {
      logger(prefix)
      console.table(msg)
      return
    }

    logger(prefix, msg)
  }
}

export default Logger