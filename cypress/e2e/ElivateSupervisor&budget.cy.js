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
                        // Click on the "supervisor" tab
                        cy.wrap($el).find('a', '  Vorgesetzte  ').eq(4).should('be.visible').click();
                        cy.wait(1000); // Wait for the tab content to load
                        
                        // Click on the "Teammitglied hinzufügen" button
                        cy.get('button.add-apUser-btn').eq(0).should('be.visible').click();
                    });
                }
            });

            // Step 6: Add supervisor team members
            if (Array.isArray(supervisor) && supervisor.length > 0) {
                supervisor.forEach((supervisors) => {
                    // Log the member data for debugging
                    cy.log(`Processing member: ${JSON.stringify(supervisors)}`);

                    // Ensure properties are defined
                    if (supervisors.first_name && supervisors.last_name) {
                        const uniqueId0 = `${Math.random().toString(36).substr(2, 9)}`;
                        cy.log(`Generated Unique ID: ${uniqueId0}`);

                        // Fill in first name, last name, and email
                        cy.get('#firstName').type(supervisors.first_name);
                        cy.get('#lastName').type(supervisors.last_name);
                        cy.get('#email').type(`asaddiqua+${uniqueId0}@webinale.de`);

                        // Submit the form
                        cy.get('button').contains(' Vorgesetzte:n hinzufügen ').click();
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
                                    cy.wrap($el).find('a', '  Vorgesetzte  ').eq(4).should('be.visible').click();
                                    cy.wait(1000); // Wait for the tab content to load
                                    // Click on the "Teammitglied hinzufügen" button again
                                    cy.get('button.add-apUser-btn:contains("Vorgesetzte hinzufügen")').click();

                                });
                            }
                        });
                    } else {
                        cy.log(`Error: Missing properties for member - ${JSON.stringify(supervisors)}`);
                    }
                });
            }

            // Step 7: After finishing the loop, reload the page and click on the team
            cy.log("No further members to add. Reloading page and clicking on recent team.");
            cy.reload();
            cy.wait(3000);
            cy.get('button').contains(team_name).click(); // Click on the specific team again
            cy.wait(3000);

            // Step 8: Click on the "Budget anpassen" button inside the correct team
            cy.get('.team-header.admin-tool').each(($el) => {
                const currentTeamName = $el.text().trim();
                if (currentTeamName.includes(team_name)) {
                    cy.wrap($el).within(() => {
                        cy.get('button.edit-team-btn[title="Budget anpassen"]').should('be.visible').click();
                        cy.get('#budgetDifference').click().clear().type('1');
                        cy.get('button[type="submit"][class="btn btn-sm btn-primary rounded-corners-10 mr-2 px-2 font-weight-bold col-lg-2 col-4 elevate-btn-disabled"]').click();
                        cy.wait(2000);
                        reload();
                        cy.get('button.edit-team-btn[title="Budget anpassen"]').should('be.visible').click();
                        cy.get('#budgetDifference').click().clear().type('-1');
                        cy.get('button[type="submit"][class="btn btn-sm btn-primary rounded-corners-10 mr-2 px-2 font-weight-bold col-lg-2 col-4 elevate-btn-disabled"]').click();
                        cy.wait(2000);
                        reload();




                    });
                }
            });

        });
    });
});
