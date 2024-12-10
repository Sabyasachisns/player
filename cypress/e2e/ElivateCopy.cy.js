describe('Login to the Kiosk page', () => {
    it('Should successfully log in using credentials from Elevate_Data.json', () => {
      
        // Load the credentials from Elevate_Data.json file dynamically
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
            const edit_name = credentials.editname;
            const edit_cost_center = credentials.editcostcenter;
            const supervisor = credentials.team_supervisor;

  
            // Construct the URL for basic authentication
            const url = `https://${authusername}:${authpassword}@staging-kiosk.entwickler.de/reader`;
  
            // Step 1: Visit the page with basic authentication
            cy.visit(url);
  
            // Step 2: Enter credentials into the login form
            cy.get('input[name="username"]').type(username);
            cy.get('button[name="login"]').click();
            cy.wait(500);
            cy.get('#password').type(password);
            cy.get('button[name="login"]').click();
            cy.wait(3000);
            cy.get('button[aria-label="Close"]').eq(0).click();
  
            // Step 3: Assert successful login
            cy.contains('Elevate').should('be.visible');
            cy.contains('Elevate').click();
            cy.wait(3000);
  
            // Step 4: Click the recently created team
            cy.get('button').contains(team_name).click(); // Click on the specific team
            cy.wait(3000);
  
           // Step 5: Click on "Teammitglieder" (Team Members) tab
            cy.get('.team-header.admin-tool').each(($el) => {
                const currentTeamName = $el.text().trim();
  
                // Check if the current team matches the team_name variable
                if (currentTeamName.includes(team_name)) {
                    cy.wrap($el).within(() => {
                        // Click on the "Teammitglieder" tab
                        cy.wrap($el).find('a', ' Teammitglieder ').eq(3).should('be.visible').click();
                        cy.wait(1000); // Wait for the tab content to load
                        
                        // Click on the "Teammitglied hinzufügen" button
                        cy.get('button.add-team-member-btn').eq(0).should('be.visible').click();
                    });
                }
            });
  
            // Step 6: Add team members
            if (Array.isArray(members) && members.length > 0) {
                members.forEach((member) => {
                    // Log the member data for debugging
                    cy.log(`Processing member: ${JSON.stringify(member)}`);
  
                    // Ensure properties are defined
                    if (member.first_name && member.last_name) {
                        const uniqueId0 = `${Math.random().toString(36).substr(2, 9)}`;
                        cy.log(`Generated Unique ID: ${uniqueId0}`);
  
                        // Select the gender dropdown, using member's salutation
                        cy.get('#gender').select(member.salutation); // Assuming salutation is defined
  
                        // Fill in first name, last name, and email
                        cy.get('#firstName').type(member.first_name);
                        cy.get('#lastName').type(member.last_name);
                        cy.get('#email').type(`asaddiqua+${uniqueId0}@webinale.de`);

                        const filePath = 'sample.csv'; // Change to the path of your file

                        // Attach the file to the file input
                        cy.get('input[type="file"].pb-3').attachFile(filePath);

  
                        // Submit the form
                        cy.get('button').contains(' Teammitglied hinzufügen ').click();
                        cy.wait(2000); // Adjust the wait time based on form submission speed
  
                        // Reload the page and repeat for the next member
                        cy.reload(); // Reload to reset the form
                        cy.wait(3000);
  
                        // Click on the recently created team again to ensure we are in the correct context
                        cy.get('button').contains(team_name).click();
                        cy.wait(3000);
                        cy.get('.team-header.admin-tool').each(($el) => {
                            const currentTeamName = $el.text().trim();
                            if (currentTeamName.includes(team_name)) {
                                cy.wrap($el).within(() => {
                                    // Click on "Teammitglieder" tab
                                    cy.wrap($el).find('a', ' Teammitglieder ').eq(3).should('be.visible').click();
                                    cy.wait(1000); // Wait for the tab content to load
                                    // Click on the "Teammitglied hinzufügen" button again
                                    cy.get('button.add-team-member-btn').eq(0). should('be.visible').click();
                                });
                            }
                        });
                    } else {
                        cy.log(`Error: Missing properties for member - ${JSON.stringify(member)}`);
                    }
                });
            } 
            {
                cy.log("No further members to add. Reloading page and clicking on recent team.");
                // If no members are left, reload the page and click on the team name
                cy.reload();
                cy.wait(3000);
                cy.get('button').contains(team_name).click(); // Click on the specific team again
                cy.wait(3000);
            }


            ///////////////// Edit the team //////////////////////////////

            cy.get('.team-header.admin-tool').each(($el) => {
                const currentTeamName = $el.text().trim();
  
                // Check if the current team matches the team_name variable
                if (currentTeamName.includes(team_name)) {
                    cy.wrap($el).within(() => {
                        cy.fixture('Elevate_Data').then((edit) => {

                        const edit_name = edit.editname;
                        const edit_cost_center = edit.editcostcenter;

                        cy.log(`Edit Name: ${edit_name}`);
                        cy.log(`Edit Cost Center: ${edit_cost_center}`);

                        // Click on the "Teammitglieder" tab
                        cy.wrap($el).find('button.edit-team-btn[title="Team bearbeiten"]').eq(1).click();
                        cy.get('#data_input_team_name').eq(1).click().clear().type(edit_name);
                        cy.get('#data_input_costcenter').eq(1).clear().type(edit_cost_center);
                        cy.get('button[type="submit"]').contains('Team aktualisieren').eq(0).click({force: true});
                        cy.wait(2000)
                        cy.reload();
                        }); 

                        





                    });
                }


                if (currentTeamName.includes(team_name)) {
                    cy.wrap($el).within(() => {
                        // Click on the "Teammitglieder" tab
                        cy.wrap($el).find('a', ' Teammitglieder ').eq(3).should('be.visible').click();
                        cy.wait(1000); // Wait for the tab content to load
                        
                        // Click on the "Teammitglied hinzufügen" button
                        cy.get('button.add-team-member-btn').eq(0).should('be.visible').click();
                    });
                }
            });
  






        });
    });
  });


