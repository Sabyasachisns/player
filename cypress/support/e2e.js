// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


// Alternatively you can use CommonJS syntax:
// require('./commands')
// In your Cypress support file (cypress/support/e2e.js or cypress/support/index.js)
Cypress.on('uncaught:exception', (err, runnable) => {
    // If you want to fail the test on exception, return false
    // This prevents Cypress from failing the test
    console.log('Error occurred:', err.message);
    return false;
  
    // Alternatively, you can add custom logic to handle specific exceptions
    // Example: ignore specific error messages
    // if (err.message.includes('specific error message')) {
    //   return false; // Ignore this error
    // }
  
    // // For all other errors, let the test fail
    // return true;
  });
  //import 'cypress-graphql-mock';