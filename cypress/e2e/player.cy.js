describe('Login to the Kiosk page', () => {
  it('Should successfully log in using credentials from Elevate_Data.json', () => {
    
    // Load credentials from fixture
    cy.fixture('Elevate_Data').then((credentials) => {
      const { auth_username, auth_password, username, password } = credentials;

      // Construct the URL with Basic Auth
      const url = `https://${auth_username}:${auth_password}@entwickler.de/reader`;

      // Step 1: Visit page with Basic Auth
      cy.visit(url);

      // Step 2: Log in with form credentials
      cy.contains('a', 'Alle akzeptieren').click();
      cy.get('input[name="username"]').type(username);
      cy.get('button[name="login"]').click();

      cy.get('#password', { timeout: 10000 }).should('be.visible').type(password);
      cy.get('button[name="login"]').click();
      cy.wait(2000);

      // Step 3: Click on Live button and Meine Events
      cy.get('#live-button').trigger('mouseover');
      cy.contains('a', 'Meine Events').click();
      cy.wait(2000);
       // Step 4: Click on the first "Ihre Buchung" link
       cy.contains('a', 'Ihre Buchung').first().click();
       cy.contains('a', 'Event besuchen').click();
       cy.screenshot('event-page', { capture: 'fullPage' });

       // This will click each tab one by one inside #pills-tab
       cy.get('#pills-tab a.nav-link:visible').each(($el, index, $list) => {
        cy.wrap($el).click();
        // Optionally, add waits or assertions here
      
  // Optionally, add assertions or waits here if needed
  // cy.wait(500); // Uncomment if you want to wait between clicks
});
         // Step 5: Click on Speaker using the specific class
      cy.get('span.bb-top-navi-text').contains('Speaker').click();
      
      // Step 6: Take a full page screenshot
      cy.screenshot('event-page', { capture: 'fullPage' });

       // Step 6: Click on Aussteller
       cy.get('span.bb-top-navi-text').contains('Aussteller').click();
      
       // Step 7: Take a full page screenshot
       cy.screenshot('event-page', { capture: 'fullPage' });

       // Step 7: Click on Nachrichten
      cy.get('span.bb-top-navi-text.text-white').contains('Nachrichten').click();
      
      // Step 8: Take a full page screenshot
      cy.screenshot('event-page', { capture: 'fullPage' });
      cy.reload();
      cy.wait(15000);

      // Step 9: Click on Info
      cy.get('span.bb-top-navi-text').contains('Info').click();
      cy.screenshot('info-page', { capture: 'fullPage' });

      cy.get('span.bb-top-navi-text.text-nowrap').contains('Umfrage').click();
      cy.screenshot('umfrage-page', { capture: 'fullPage' });
      cy.get('#devopscon-berlin-2025__action--close').click();

      cy.get('span.text-nowrap.font-weight-bolder').contains('Live Chat').click();
      cy.screenshot('live-chat-page', { capture: 'fullPage' });

      cy.get('span.bb-text-size-14').contains('Vormerken').click();
      cy.screenshot('vormerken-page', { capture: 'fullPage' });

      cy.get('span.bb-text-size-14').contains('Bewertung').click();
      cy.screenshot('bewertung-page', { capture: 'fullPage' });

      cy.get('span.bb-text-size-14').contains('Bewertung').click();
      cy.screenshot('bewertung-page', { capture: 'fullPage' });


    });
  });
});