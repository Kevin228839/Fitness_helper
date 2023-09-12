const api = {
  hostname: process.env.REACT_APP_HOST_NAME,
  protocol: process.env.REACT_APP_TRANSMIT_PROTOCOL,
  getFoodList: function () {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/foodinfo`);
  }
};

export default api;
