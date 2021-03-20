export interface Ioption {
  domain?: string;
  path?: string;
  expires?: number;
  secure?: boolean;
}

export type setFn = (key: string, value: any, option?: Ioption) => boolean
export type getFn = (key: string) => string | null
export type clearFn = (key: string, domain?: string) => boolean
export type storeType = 'cookie' | 'localStorage' | 'sessionStorage'

export interface IhandleStorage {
  set: setFn;
  get: getFn;
  clear: clearFn;
}

export interface Istorage {
  sessionStorage: IhandleStorage | null;
  localStorage: IhandleStorage | null;
  cookie: IhandleStorage | null;
  get: (key: string, storeType?: storeType) => string | null | undefined;
  set: (key: string, value: string, storeType?: storeType, option?: Ioption) => boolean;
  clear: (key: string, storeType?: storeType, domain?: string) => boolean;
}

export const storage: Istorage = (function () {
  if(typeof window === 'undefined') return {
    sessionStorage: null,
    localStorage: null,
    cookie: null,
    get: () => null,
    set: () => false,
    clear: () => false
  };

  const handleStorage: Istorage = {
    sessionStorage: {
      set (key, val) {
        let res;
        try {
          if (!window.sessionStorage) throw false;
          window.sessionStorage.setItem(key, val);
          res = true;
        } catch (err) {
          res = false;
        }

        return res;
      },
      get (key) {
        let res;
        try {
          if (!window.sessionStorage) throw false;
          res = window.sessionStorage.getItem(key);
        } catch (err) {
          res = null;
        }

        return res;
      },
      clear (key) {
        let res;
        try {
          if (!window.sessionStorage) throw false;
          window.sessionStorage.removeItem(key);
          res = true;
        } catch (err) {
          res = false;
        }

        return res;
      }
    },
    localStorage: {
      set (key, val) {
        let res;
        try {
          if (!window.localStorage) throw false;
          window.localStorage.setItem(key, val);
          res = true;
        } catch (err) {
          res = false;
        }

        return res;
      },
      get (key) {
        let res;
        try {
          if (!window.localStorage) throw false;
          res = window.localStorage.getItem(key);
        } catch (err) {
          res = null;
        }

        return res;
      },
      clear (key) {
        let res;
        try {
          if (!window.localStorage) throw false;
          window.localStorage.removeItem(key);
          res = true;
        } catch (err) {
          res = false;
        }

        return res;
      }
    },
    cookie: {
      set (key, val, option) {
        let res;
        try {
          const { domain = '', path = '/', expires = 0, secure = false } = option || {};
          let ts;
          if(expires >= 0){
            ts = new Date();
            ts.setTime(ts.getTime() + expires * 1000);
          }
          document.cookie = `${key}=${val};${domain ? `domain=${domain};` : ''}${path ? `path=${path};` : ''}${expires ? `expires=${ts ? ts.toUTCString() : ''};` : ''}${secure ? 'secure' : ''}`;
          res = true;
        } catch (err) {
          res = false;
        }
  
        return res;
      },
      get (key) {
        const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        const cookArr = document.cookie.match(reg);
        if (cookArr && cookArr[2]) {
          return unescape(cookArr[2]);
        }

        return null;
      },
      clear (key, domain) {
        document.cookie = `${key}="";${domain ? `domain=${domain};` : ''}max-age=-1`;
        const res = handleStorage.cookie?.get(key);

        return !res;
      }
    },
    get (key, storeType) {
      try {
        if (typeof storeType === 'string' && handleStorage[storeType]) {
          return handleStorage[storeType]?.get(key);
        }
        return this.cookie?.get(key) ?? this.localStorage?.get(key) ?? this.sessionStorage?.get(key);
      } catch (e) {
        return null;
      }
    },
    set (key, val, storeType, option) {
      let res;

      try {
        if (typeof storeType === 'string' && handleStorage[storeType]) {
          res = handleStorage[storeType]?.set(key, val, option) ?? false;
        } else if (option) {
          res = handleStorage.cookie?.set(key, val, option) ?? false;
        } else {
          res = handleStorage.localStorage?.set(key, val) ?? false;
        }
      } catch (e) {
        res = false;
      }

      return res;
    },
    clear (key, storeType, domain) {
      let res;

      try {
        if (typeof storeType === 'string' && handleStorage[storeType]) {
          res = handleStorage[storeType]?.clear(key, domain) ?? false;
        } else if (domain) {
          res = handleStorage.cookie?.clear(key, domain) ?? false;
        } else {
          res = (handleStorage.localStorage?.clear(key) && handleStorage.sessionStorage?.clear(key)) || false;
        }
      } catch (e) {
        res = false;
      }

      return res;
    }
  };

  return handleStorage;
})();

export default storage;