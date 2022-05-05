const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('#convertHandler should correctly read a whole number input', function () {
      assert.strictEqual(convertHandler.getNum('1gal'), 1, "1gal number is 1");
  });

  test('#convertHandler should correctly read a decimal number input', function () {
    assert.strictEqual(convertHandler.getNum('1.1gal'), 1.1, 'getNum returns decimal number form expression');
  });

  test('#convertHandler should correctly read a fractional input', function () {
    assert.strictEqual(convertHandler.getNum('5/5gal'), 1, 'getNum returns fractional part of expression');
  });

  test('#convertHandler should correctly read fractional input with a decimal', function () {
   assert.strictEqual(convertHandler.getNum('1.1/1gal'), 1.1, '1.1/1gal getNum converts to 1.1');
  });

  test('#convertHandler should correctly return an error on a double-fraction', function () {
    assert.strictEqual(convertHandler.getNum('5/5/5gal'), 'invalid number', 'invalid fraction input number returns an error "invalid number"');
  });

  test('#convertHandler should correctly default to a numerical input to 1 when no numerical input is provided', function () {
    assert.strictEqual(convertHandler.getNum('kg'), 1, 'getNum with input without number should return 1');
  });

  test('#convertHandler should correctly read each valid input unit', function () {
    assert.strictEqual(convertHandler.getUnit('1gal'), 'gal', 'getUnit should retrieve gal from 1gal');
  });

  test('#convertHandler should return an error for an invalid input unit', function () {
    assert.strictEqual(convertHandler.getReturnUnit('gas'), 'invalid unit', 'getREturnUnit returns invalid unput in case of inappropriate input unit');
  });

  test('#convertHandler should return the corrent return unit for each valid input unit', function () {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'gal converts to L');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'kg converts to lbs');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'lbs converts to lbs');
  });

  test('#convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'gal spelled out as gallons');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', 'km spelled out as kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg spelled out as kilograms');
  });

  test('#convertHandler should correctly convert gal to L', function () {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541, '1 gal is 3.78541 liters');
  });

  test('#convertHandler should correctly convert L to gal', function () {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417, '1 liter is 0.26417 gallons');
  });
  
  test('#convertHandler should correctly convert mi to km', function () {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934, '1 kilometers is 1.60934 miles');
  });
  
  test('#convertHandler should correctly convert km to mi', function () {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137, '1 miles is 0.62137 kilometers');
  });
  
  test('#convertHandler should correctly convert lbs to kg', function () {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359, '1 pound is 0.45359 kilograms');
  });
  
  test('#convertHandler should correctly convert kg to lbs', function () {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462, '1 kilogram is 2.20462 pounds');
  });
  
});