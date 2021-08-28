// no longer used

const ObjectId = require('mongoose').Types.ObjectId;

const convertResObjectIdToString = (req, res, next) => {
  const oldSend = res.send;
  res.send = (data) => {
    for (let key in data) {
      const value = data[key];
      if (value instanceof ObjectId) {
        data[key] = value.toString();
      }
    }
    oldSend.call(res, data);
  };
  next();
};

module.exports = convertResObjectIdToString;
