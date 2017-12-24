var setItem = function(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
};
var getItem = function(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      var ret = c.substring(nameEQ.length, c.length);
      switch (ret) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return ret;
      }
    }
  }
  return null;
};
var removeItem = function(name) {
  setItem(name, '', -1);
};
module.exports = {
  getItem: getItem,
  setItem: setItem,
  removeItem: removeItem
};
