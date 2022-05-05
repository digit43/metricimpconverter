function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // get nums
    result = input.replace(/(^[0-9\.\/]*)\w+/i, '$1');

    // set to defalut value 1 if result is the same as input
    if (!result) {
      return 1;
    }
    
    // check for fraction
    if (result.indexOf('/') > -1) {
      let numsArray = result.split('/');
      
      // if fraction consist of more than 2 arguments assing invalid number 
      // esle calculate fraction with precision
      if (numsArray.length > 2) {
        result = "invalid number";
      } else {
        result = Math.round(numsArray[0] / numsArray[1] * 100000) / 100000;
      }
    } else {
      // parse string number to float
      result = parseFloat(result);
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.replace(/^[0-9\.\/]*(\w+)/i, '$1');
    result = result.toLowerCase();
    if (result === "l") {
      result = result.toUpperCase();
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    
    switch(initUnit) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default: 
        result = "invalid unit";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    spellOuts = {
      "L": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "pounds",
      "kg": "kilograms",
      "gal": "gallons"
    }
    
    if (spellOuts.hasOwnProperty(unit)) {
      result = spellOuts[unit];
    } else {
      result = unit;
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initNum === "invalid number") {
      return initNum
    }
    
    initUnit = initUnit.toLowerCase();
    
    switch(initUnit) {
      case "gal":
        result = Math.round(initNum * galToL * 100000) / 100000;
        break;
      case "l":
        result = Math.round(initNum / galToL * 100000) / 100000;
        break;
      case "mi":
        result = Math.round(initNum * miToKm * 100000) / 100000;
        break;
      case "km":
        result = Math.round(initNum / miToKm * 100000) / 100000;
        break;
      case "lbs":
        result = Math.round(initNum * lbsToKg * 100000) / 100000;
        break;
      case "kg":
        result = Math.round(initNum / lbsToKg * 100000) / 100000;
        break;
      default: 
        break;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };
  
}

module.exports = ConvertHandler;
