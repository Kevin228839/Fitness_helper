const api = {
  hostname: 'localhost:8000',
  protocol: 'http',
  getFoodList (page) {
    return fetch(`${this.protocol}://${this.hostname}/api/v1/foodinfo?page=${page}`);
  }
};

export default api;
