import Settings from '../config.js';
import Auth from '../services/Auth.js';

var serialize = function(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }

  return str.join("&");
}

var API = {
  call: function(method, endpoint, payload, callback) {
    var endpoint = (endpoint.indexOf('http') == -1 ? Settings.API_URL.replace(/\/$/, "") : '') + endpoint + (endpoint.indexOf('?') == -1 ? '?' : '&') + serialize(payload) + '&t=' + (new Date()).getTime();
    
    switch (String(method).toUpperCase()) {
      case 'GET':
        return fetch(endpoint)
        .then(res => res.json())
        .then(
          (result) => {
            return callback(result, null);
          },
          (error) => { // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            return callback(null, error);
          }
        );
      case 'POST':
      case 'PUT':
        return fetch(endpoint, {
          method: String(method).toUpperCase(),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: payload
        })
        .then(res => res.json())
        .then(
          (result) => {
            return callback(result, null);
          },
          (error) => { // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            return callback(null, error);
          }
        );
        break;
      default:
        console.error('API method ' + method + ' not supported. Sorry');

        return false;
    }
  }
}

export default API;