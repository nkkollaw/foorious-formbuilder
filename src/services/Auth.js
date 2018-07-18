import Settings from '../config.js';

var Auth = {
  getToken() {
    return window.localStorage.getItem('NOPE');
  },

  setToken(token) {
    window.localStorage.setItem('NOPE', token);
  }
}

Auth.setToken(Settings.ACCESS_TOKEN);

export default Auth;