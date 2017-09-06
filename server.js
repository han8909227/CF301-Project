'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));



app.get('/test/:loc/:keyword?/:classify?', tmTest);
app.get('/*', (request, response) => response.sendFile('index.html', {root: './public'}));



function tmTest(request, response) {
  console.log(request.params);
  (requestProxy({
    url: `https://app.ticketmaster.com/discovery/v2/events.json?
    city=${request.params.loc}&keyword=${request.params.keyword}
    &classificationName=${request.params.classify}
    &apikey=${process.env.APIKEY}`
  }))(request, response);

  // if(response._embedded.events.length === 0){
  //   alert('no result for your search');
  // }
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
