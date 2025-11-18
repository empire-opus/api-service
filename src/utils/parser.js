const xml2js = require('xml2js');
const fs = require('fs');

const parser = {
  parseXml: function(file) {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser();
      fs.readFile(file, (err, data) => {
        if (err) return reject(err);
        parser.parseString(data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  }
};

module.exports = parser;