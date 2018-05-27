const fetch = require('node-fetch-polyfill');

/**
 * Escapes given text to be valid query param value
 * @param {*} text 
 */
function escapeSpaces(text) {
  return text.replace(/ /g, '%20');
}

/**
 * Escapes slashes and spaces for BTT endpoints
 * @param {*} text 
 */
function escapeForBtt(text) {
  const result = String(text);
  return result
    .replace(/ /g, '%20')
    .replace(/\//g, '\/');
}


module.exports = {
  fetch,
  escapeSpaces,
  escapeForBtt
}