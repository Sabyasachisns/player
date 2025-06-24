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

        // Step 3: Click on 'Mehr ansehen' paragraph inside the specific div
        cy.get('div.d-flex.flex-wrap.justify-content-between.mt-5.ng-star-inserted')
          .find('a > p.m-0.ng-star-inserted')
          .contains('Mehr ansehen')
          .click();

        // Step 4: Click on the specific image by src and class
        cy.get('img.card-img-top[src="/wp-content/themes/understrap-child/reader-web-app-angular/assets/images/home-brands/Rectangle15809.svg"]').click();

        // Step 5: Click on the image with class 'rounded-corners-10' and the specified src
        cy.get('img.rounded-corners-10[src="https://s3.eu-west-1.amazonaws.com/redsys-prod/userCollectionImageSets/undefined/images/imageSet_xx_DEVOPS_coll_art_entwickler_02.png"]').click();

        // Step 6: Click on the next image with class 'rounded-corners-10' and the new specified src
        cy.get('img.rounded-corners-10[src="https://s3.eu-west-1.amazonaws.com/redsys-prod/userCollectionImageSets/undefined/images/imageSet_xx_DEVOPS_coll_art_entwickler_03.png"]').click();

      
        // Step 9: Click on the input field for 'Sammlung Name'
        cy.get('input[name="collectionName"][placeholder="Sammlung Name"]', { timeout: 10000 })
          .should('be.visible')
          .click();

        // Step 10: Click on the textarea for collection description
        cy.get('textarea[name="collectionDiscription"][placeholder="Füge eine Beschreibung hinzu"]', { timeout: 10000 })
          .should('be.visible')
          .click().type('Description');
          
    });
    });
  });
