module.exports = class ENUM {
  static ENUM = {};

  static getValues() {
    return Object.values(this.ENUM);
  }

  static getKeys() {
    return Object.keys(this.ENUM);
  }

  static get() {
    return this.ENUM;
  }
};
