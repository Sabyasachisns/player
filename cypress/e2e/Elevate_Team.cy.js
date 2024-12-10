describe('Login to the Kiosk page', () => {
  it('Should successfully log in using credentials from Elivate_Data.json', () => {
    
      // Load the credentials from Elevate_Data.json file dynamically
      cy.fixture('Elevate_Data').then((credentials) => {
      
          // Extract credentials from the loaded file
          const authusername = credentials.auth_username;
          const authpassword = credentials.auth_password;
          const username = credentials.username;
          const password = credentials.password;
          const team_name = credentials.teamname;
          const credit = credentials.credit;
          const cost_center = credentials.costcenter;
         
      
          // Construct the URL for basic authentication
          const url = `https://${authusername}:${authpassword}@staging-kiosk.entwickler.de/reader`;

          // Step 1: Visit the page with basic authentication
          cy.visit(url);

          // Step 2: Enter credentials into the login form (adjust the selectors as needed)
          cy.get('input[name="username"]').type(username);  // Fill in username from the custom file
          cy.get('button[name="login"]').click();
          cy.wait(500);

          cy.get('#password').type(password);  // Fill in password from the custom file
          cy.get('button[name="login"]').click();

          // Step 3: Close the modal or popup if it exists
          cy.wait(3000);
          cy.get('button[aria-label="Close"]').eq(0).then(($closeButton) => {
              if ($closeButton.is(':visible')) {
                  cy.wrap($closeButton).click({ force: true });  // Close the modal if it's visible
              }
          });

          // Step 4: Assert successful login by checking for the "Elevate" text
          cy.contains('Elevate').should('be.visible');
          cy.contains('Elevate').click();


           cy.contains('Meine Teams').should('be.visible');
          cy.contains('Alle Anfragen').should('be.visible');
          cy.contains('Rechnungen').should('be.visible');
          cy.contains('Elevate Budget').should('be.visible');

          // Step 5: Wait and then check if the "Add a Team" button exists in German or English
          cy.wait(4000);
          cy.get('body').then(($body) => {
              if ($body.find('button:contains("Team hinzufügen")').length > 0) {
                  // If the button exists in German, click it
                  cy.contains('Team hinzufügen').click();
              } else if ($body.find('button:contains("Add a team")').length > 0) {
                  // If the button exists in English, click it
                  cy.contains('Add a team').click();
              } else {
                  throw new Error('Neither "Team hinzufügen" nor "Add a team" button found.');
              }
          });

          // Step 6: Fill in team details and submit the form
          cy.get('#data_input_team_name').click().type(team_name);
          cy.get('#data_input_teambudget').click().type(credit);
          cy.get('#data_input_costcenter').click().type(cost_center);
          cy.get('#data_input_display_budget_2_team').click();  // Toggle the display budget option
          
          // Submit the form
          cy.get('[type="submit"]').eq(1).click();
          cy.wait(3000);
          cy.reload();
          cy.get('button').contains(team_name).click();
          cy.wait(3000);

        
            ///////////////// Edit the team //////////////////////////////
            cy.get('.team-header.admin-tool').each(($el) => {
                const currentTeamName = $el.text().trim();
                cy.wait(1000);

                // Check if the current team matches the team_name variable
                if (currentTeamName.includes(team_name)) {
                    cy.wrap($el).within(() => {
                        cy.fixture('Elevate_Data').then((edit) => {
                            const edit_name = edit.editname;
                           
                            cy.log(`Edit Name: ${edit_name}`);
                           
                           
                            cy.wrap($el).find('button.edit-team-btn[title="Team bearbeiten"]').eq(1).click();
                            cy.get('#data_input_team_name').eq(1).click().clear().type(edit_name).type('{enter}');
                           
                            cy.wait(3000);
                            cy.reload();

                            cy.wait(3000);
                        });
                    });
                }
                

               
            });
        });
    });
});
