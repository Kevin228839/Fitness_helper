const api = {
  hostname: 'localhost:8000',
  protocol: 'http',
  getFoodList: function () {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/foodinfo`);
  }
};

export default api;
