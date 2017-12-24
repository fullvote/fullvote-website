var myCookieStorage = require('./front-end-cookie-storage');

var myMemoryStorage = (function() {
  var _data = {};
  var getItem = function(key) {
    return _data.hasOwnProperty(key) ? _data[key] : void 0;
  };
  var setItem = function(key, value) {
    return (_data[key] = String(value));
  };
  var removeItem = function(key) {
    return delete _data[key];
  };
  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem
  };
})();

var TEST_KEY = '__test';
var hasCookies = function() {
  try {
    myCookieStorage.set(TEST_KEY, '1');
    const value = myCookieStorage.get(TEST_KEY);
    myCookieStorage.del(TEST_KEY);
    return value === '1';
  } catch (e) {
    return false;
  }
};
var hasStorage = function(name) {
  try {
    const storage = window[name];
    storage.setItem(TEST_KEY, '1');
    storage.removeItem(TEST_KEY);
    return true;
  } catch (e) {
    return false;
  }
};
var getStorageContainer = function() {
  if (hasStorage('localStorage')) {
    return window.localStorage;
  }
  if (hasStorage('sessionStorage')) {
    return window.sessionStorage;
  }
  if (hasCookies()) {
    return myCookieStorage;
  }
  return myMemoryStorage;
};

module.exports = getStorageContainer();
