describe('Google Search for Selenium', () => {
  it('should search for Selenium, press down two times, and press enter', () => {
    // Step 1: Open Google
    cy.visit('https://www.google.com');
    cy.get('#W0wltc').click();

    // Step 2: Search for "Selenium"
    cy.get('.gLFyf').type('Selenium');

    // Step 3: Wait for the results to load (optional)
    cy.wait(2000); // Adjust timing if necessary

    // Step 4: Press the down arrow key two times, and then press Enter
    cy.get('body').type('{downarrow}{downarrow}{enter}');
  })
});