#!/usr/bin/env node

const app = require('commander');
const fetch = require('node-fetch');
require('console.table');

let getOpenFoodTrucks = function() {
  let now = new Date();
  const url = 'http://data.sfgov.org/resource/bbb8-hzi6.json?dayorder=' + now.getDay() + '&$order=applicant ASC';

  fetch(url)
    .then(response => {
      response.json().then(result => {
        let count = 1;
        let trucks = [];
        for(let truck in result) {
          let start = Number(result[truck].start24.substring(0,2));
          let end = Number(result[truck].end24.substring(0,2));
          if (now.getHours() > start && now.getHours() < end && count <= 10) {
            trucks.push({NAME: result[truck].applicant, ADDRESS: result[truck].location});
            count++;
          }
        }
        console.table(trucks);
      })
    })
    .catch(error => {
      console.log(error);
    });
}

app
  .version('0.0.1')
  .action(getOpenFoodTrucks());

app.parse(process.argv);
