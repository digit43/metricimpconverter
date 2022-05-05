'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const {input} = req.query;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    let string;
    let convertData;

    if (returnUnit === "invalid unit" && returnNum === "invalid number") {
      string = `invalid number and unit`;
      // res.json(`${string}`);
    } else if (returnUnit === "invalid unit") {
      string = returnUnit;
    } else if (returnNum === "invalid number") {
      string = returnNum;
    } else {
      string = convertHandler.getString(
        initNum, 
        convertHandler.spellOutUnit(initUnit), 
        returnNum, 
        convertHandler.spellOutUnit(returnUnit)
      );
      convertData = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
      }

    }

    // our response for query
    let response;
    if (typeof convertData === "object") {
      response = Object.assign({}, convertData, {string});
    } else {
      response = string;
    }
    
    res.json(response).status(200);
  })

};
