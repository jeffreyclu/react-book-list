const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  const { method, url } = request;
  if (method === 'GET' && url === '/') {
    fs.readFile('index.html', (err, data) => {
      response.setHeader('Content-Type', 'text/html');
      response.write(data);
      response.end();
    });
  } else if (method === 'GET' && url === '/app.js') {
    fs.readFile('app.js', (err, data) => {
      response.setHeader('Content-Type', 'application/javascript');
      response.write(data);
      response.end();
    });
  } else if (method === 'GET' && url === '/style.css') {
    fs.readFile('style.css', (err, data) => {
      response.setHeader('Content-Type', 'text/css');
      response.write(data);
      response.end();
    });
  } else if (method === 'GET' && url === '/data.json') {
    fs.readFile('data.json', (err, data) => {
      response.setHeader('Content-Type', 'application/json');
      response.write(data);
      response.end();
    });
  } else if (method === 'GET' && url === '/assets/j-zamora-GWOTvo3qq7U-unsplash.jpg') {
    fs.readFile('assets/j-zamora-GWOTvo3qq7U-unsplash.jpg', (err, data) => {
      response.setHeader('Content-Type', 'image/jpeg');
      response.end(data);
    });
  } else {
    response.end('404 Error: page not found!');
  }
}).listen(port);

module.exports = server;
