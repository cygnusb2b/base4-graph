const { AuthenticationError } = require('apollo-server-express');

class Credentials {
  constructor({ key, err } = {}) {
    this.key = key;
    this.err = err;
  }

  isValid() {
    const error = this.getError();
    if (error) return false;
    return true;
  }

  getError() {
    if (this.err) return this.err instanceof Error ? this.err : new Error(this.err);
    if (!this.key) return new Error('No API key was provided.');
    return null;
  }

  check() {
    if (!this.isValid()) throw new AuthenticationError('You must be logged-in to access this resource.');
  }
}

module.exports = Credentials;
