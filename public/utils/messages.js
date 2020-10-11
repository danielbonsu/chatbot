const moment = require('moment');

const formatMessage = (msg) => {
  return {
    ...msg,
    time: moment().format('h:mm a'),
  };
};

module.exports = formatMessage;
