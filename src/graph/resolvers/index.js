const { DateType } = require('../custom-types');


module.exports = {
  /**
   *
   */
  Date: DateType,

  /**
   *
   */
  Query: {
    /**
     *
     */
    ping: () => 'pong',
  },
};
