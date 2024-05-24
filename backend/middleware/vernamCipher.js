const crypto = require('crypto');
require('dotenv').config();

function VernamCipher(data) {
  const KEY = process.env.KEY;
  // console.log(KEY)
  if (!KEY) throw new Error("Environment variable KEY is not set.");

  // Extend the key to match the length of the data
  let extendedKey = KEY;
  while (extendedKey.length < data.length) {
    extendedKey += KEY;
  }
  extendedKey = extendedKey.slice(0, data.length);

  let outputString = "";
  for (let index = 0; index < data.length; index++) {
    const dataCharCode = data.charCodeAt(index);
    const keyCharCode = extendedKey.charCodeAt(index);
    
    // Vernam cipher XOR operation
    const outCharCode = dataCharCode ^ keyCharCode;
    // console.log(String.fromCharCode(outCharCode+65));
    // Convert the resulting character code back to a character
    outputString += String.fromCharCode(outCharCode+65);
  }
  return outputString;
}

// Example usage
const data = "HELLO";
// process.env.KEY = "XMCKL"; // Example key, this should be set securely
const encrypted = VernamCipher(data);
console.log("Encrypted:", encrypted);

module.exports = VernamCipher;
