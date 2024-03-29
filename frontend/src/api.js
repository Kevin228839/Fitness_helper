const api = {
  hostname: process.env.REACT_APP_HOST_NAME,
  protocol: process.env.REACT_APP_TRANSMIT_PROTOCOL,
  getFoodList: function () {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/foodinfo/general`, {
      method: 'GET',
      credentials: 'include'
    });
  },
  createFood: function (payload) {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/foodinfo/upload`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
  },
  autoLogin: function () {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/user/autologin`, {
      method: 'GET',
      credentials: 'include'
    });
  },
  logout: function () {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/user/logout`, {
      method: 'DELETE',
      credentials: 'include'
    });
  },
  getProfile: function () {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/user/profile`, {
      method: 'GET',
      credentials: 'include'
    });
  }
};

export default api;
