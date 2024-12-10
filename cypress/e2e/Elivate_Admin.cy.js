describe('Login to the Kiosk page', () => {
    it('Should successfully log in using credentials from Elivate_Data.json', () => {
      
      // Load the credentials from Elivate_Data.json file dynamically
      cy.fixture('Elevate_Data').then((credentials) => {
        
        // Use the username and password from the loaded file
        const authusername = credentials.auth_username;
        const authpassword = credentials.auth_password;
        const username = credentials.username;
        const password = credentials.password;
        const team_name = credentials.teamname;
        const credit = credentials.credit;
        const cost_center = credentials.costcenter;
        const supervisor_first = credentials.supervisorfirst;
        const supervisor_last = credentials.supervisorlast;
        const members = credentials.team_members;
        

        
    
  
        // Construct the URL for basic authentication (you can skip this if there is a second login form)
        const url = `https://${authusername}:${authpassword}@staging-kiosk.entwickler.de/reader`;

        // Step 1: Visit the page with basic authentication
        cy.visit(url);
  
       
        // Step 3: Enter credentials into the login form (adjust the selectors as needed)
        cy.get('input[name="username"]').type(username);  // Fill in username from the custom file
       // cy.get('#password').type(password);  // Fill in password from the custom file
  
        // Step 4: Submit the form (adjust based on your form structure)
        cy.get('button[name="login"]').click();
        cy.wait(500);
        cy.get('#password').type(password);  // Fill in password from the custom file
        cy.get('button[name="login"]').click();
        cy.wait(3000);
        cy.get('button[aria-label="Close"]').eq(0).click();
  
        // Step 5: Assert successful login (adjust based on expected URL or behavior after login)
        cy.contains('Elevate').should('be.visible');
        cy.contains('Elevate').click();

         cy.wait(3000);
        cy.contains('Team hinzufügen').then(($button) => {
            if ($button.length) {
              cy.wrap($button).click(); // Click if "Team hinzufügen" button exists
            } else {
              cy.contains('Add a team').click(); // Click "Add a team" if "Team hinzufügen" does not exist
            }
          });
          
        cy.contains('Team hinzufügen').click().catch(() => cy.contains('Add a team').click());
        cy.get('#data_input_team_name').click().type(team_name);
        cy.get('#data_input_teambudget').click().type(credit);
        cy.get('#data_input_costcenter').click().type(cost_center);
        cy.get('#data_input_display_budget_2_team').click();
        cy.get('[type="submit"]').eq(1).click();
        cy.wait(3000);
        cy.reload();


          const uniqueId0 = `${Math.random().toString(36).substr(2, 9)}`;
    cy.log(`Generated Unique ID: ${uniqueId0}`);
    
    
  //   cy.get('button.btn-sm.btn-primary.add-apUser-btn').contains('Vorgesetzte hinzufügen').click();
   
  //   cy.get('#firstName').click().type(supervisor_first);
  //   cy.get('#lastName').click().type(supervisor_last);
  //   cy.get('#email').click().type(`skanar+${uniqueId0}@jax.de`);
  //   cy.wrap($el).contains('button', ' Vorgesetzte:n hinzufügen ').then(($link) => {
  //     if ($link.length) {
  //       // If the "Vorgesetzte" link exists, click it
  //       cy.wrap($link).click();
  //     } else {
  //       // If "Vorgesetzte" does not exist, click on "Supervisor"
  //       cy.wrap($el).find('a').contains('Add Supervisor').eq(4).click();
  //       cy.wait(5000);
  //     }
  // });
  
  // cy.reload();


  ////////////////////////////////////  Add team memebers  ///////////////////////////


  cy.get('button').contains(team_name).click();
  cy.wait(3000);

  // Find the correct team and click "Teammitglieder" (Team members) tab
  cy.get('.team-header.admin-tool').each(($el) => {
    const currentTeamName = $el.text().trim();
    
    // Check if the current team matches the team_name variable
    if (currentTeamName.includes(team_name)) {
      cy.wrap($el) // Navigate to the container of the team
        .within(() => {
          // Ensure the "Teammitglieder" tab is visible and click it
          cy.wrap($el).find('a', ' Teammitglieder ').eq(3)
            .should('be.visible')
            .click(); // Click the "Teammitglieder" tab

            cy.get('button.add-team-member-btn').eq(0).
  should('be.visible')  // Ensure the button is visible
  .click();  // Click on the button


            
        });
    }
  });


  

    
  
    // Salutation selection
   // cy.get('#salutation').select(members.salutation);
    
    // Fill in first name, last name, and email
    
    // Assuming you are inside a Cypress test case

// Select the gender dropdown and choose an option
cy.get('#gender').select('m'); // Replace 'm' with 'w' or 'd' as needed

    
    cy.get('#firstName').click().type(members.firstname);
    cy.get('#lastName').click().type(members.last_name);
    cy.get('#email').click().type(`skanar+${uniqueId0}@example.com`);
    
    // Submit the form
    cy.get('button').contains(' Teammitglied hinzufügen ').click();
    cy.wait(2000); // Adjust the wait time based on form submission speed

    cy.reload(); // Reload for the next team member to be added
  });









        
     
  


    
    

    

    
  


    
    























        //Delete the team 

      

      //   cy.get('.team-header.admin-tool').each(($el) => {
      //     // Get the team name from the current element
      //     const currentTeamName = $el.text().trim(); // Adjust this to extract just the team name
    
      //     // Check if the current team name matches the team_name variable
      //     if (currentTeamName.includes(team_name)) {
      //       // Find and click the "Team löschen" button within this specific team's container
      //       cy.wrap($el).find('button[title="Team löschen"]').eq(1).click();
      //     }

        
      //  });
      













    
      });
    });
  
