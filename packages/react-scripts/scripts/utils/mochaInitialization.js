// --require @babel/register
require('@babel/register')({
  "presets": [ "react-app" ],
});
require('ignore-styles');

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

// Setup a fetch in global scope
const nodeFetch = require('node-fetch');
global.fetch = (url, ...args) => {
  // If no protocol is specified, prepend http://localhost
  // perhaps we should use window.location? - But that is currently about:blank
  if (! /^https?:\/\//.test(url) ) {
    url = "http://localhost" + url;
  }
  return nodeFetch(url, ...args);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
