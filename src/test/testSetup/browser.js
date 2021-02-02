const { JSDOM } = require('jsdom');
const dom = new JSDOM(
  '<!DOCTYPE html><html><head></head><body></body></html>',
  {
    url: "http://localhost:3000",
    contentType: "text/html",
  }
);

global.window = dom.window;
global.document = dom.window.document;
