/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    //projectId: "u7ii97",
    setupNodeEvents(on, config) {
      screenshotOnRunFailure=true;
      //baseurl
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
// cypress.json
{
  "env"; {
    "talkStartDateTuesday"; "2024-01-23", // Set your desired start date for Tuesday talks
    "talkStartDateWednesday"; "2024-01-24", // Set your desired start date for Wednesday talks
    "talkStartDateThursday"; "2024-01-25", // Set your desired start date for Thursday talks
    "halfHourDifference"; 30 // The difference in minutes for half an hour
  }
}*/

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    pageLoadTimeout: 90000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});