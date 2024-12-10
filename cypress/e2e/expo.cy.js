const { should } = require("chai");

describe('Create Expo and Check Publish Status', () => {
    beforeEach(() => {
        cy.fixture('testData.json').as('testData');
        

        cy.intercept('POST', '/graphql', (req) => {
            req.headers['Host'] = 'redsys-stage.sandsmedia.com';
            req.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:1270) Gecko/20100101 Firefox/127.0';
            req.headers['Accept'] = '*/*';
            req.headers['Accept-Language'] = 'en-US,en;q=0.5';
            req.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd';
            req.headers['Referer'] = 'https://redsys-stage.sandsmedia.com/live_events';
            req.headers['Content-Type'] = 'application/json';
            req.headers['Authorization'] = 'HzGaJGH44Czegv5k1GtOwY_yPlhAKya2Q31wncvxsPn';
            req.headers['Origin'] = 'https://redsys-stage.sandsmedia.com';
            req.headers['Connection'] = 'keep-alive';
            req.headers['Cookie'] = '_ga=GA1.2.1341232542.1640013434; _ga_R65MMCZ1X5=GS1.2.1702042552.10.1.1702043330.0.0.0; meteor_login_token=DhRX0DvjvQX8FzRXX9RPK4K9Uzpq_rOv2nEYOHaRuGW';
            req.headers['Sec-Fetch-Dest'] = 'empty';
            req.headers['Sec-Fetch-Mode'] = 'cors';
            req.headers['Sec-Fetch-Site'] = 'same-origin';
            req.headers['Priority'] = 'u=4';
            req.headers['TE'] = 'trailers';
        }).as('graphql');
        cy.setCookie('meteor_login_token', 'HzGaJGH44Czegv5k1GtOwY_yPlhAKya2Q31wncvxsPn'); // Replace with your domain
    });

    it('Should create Expo, check publish status, handle pop-up, create Sales and Marketing PartnerTypes', function() {
 const { expo, partnerType, pageUrls, eventSelector } = this.testData;

        // Visit the live events page
        cy.visit(pageUrls.liveEventsPage);

        cy.get('[name="search"]').click().type('TS update check');
        cy.get('a[href]').contains('TS update check').click();




        // Navigate to the Expo section
        cy.get('.children').should('be.visible').contains('Expo').click();

        // Create a new Expo
        cy.get('.list').should('be.visible').contains('New Expo').click();
        cy.get('#frc-name-1048423413').should('be.visible').click().type(expo.name);
        cy.get('textarea[type="text"]').should('be.visible').click().type(expo.description);
        cy.get(`td[data-value="${expo.startDateValue}"]`).eq(1).click();
        cy.get(`td[data-value="${expo.endDateValue}"]`).eq(2).click();
        cy.get('.css-1hwfws3').eq(0).click();
        cy.get('body').type('{downarrow}{enter}');
        cy.get('button[type="Submit"]').scrollIntoView().should('be.visible').click();
       
        
        cy.get('h4 a[href^="/expos/"]').first().click();

        // Click on the Publish button if it exists
        cy.get('button').contains('Publish', { timeout: 10000 }).click();


        
        // Click on the element with the attribute 'd'
        cy.get('path[d]', { timeout: 10000 }).click();

        // Navigate back to the previous page
        cy.go('back');

        // Check if the second div with class 'titleStringValue' has the status 'Published'
        
        cy.wait(3000);

        cy.get('h4 a[href^="/expos/"]').first().click();
        cy.get('button').contains('Partner Types').click();
        cy.get('a[href*="#"]').contains('Create new Sales PartnerType').click();
        // Enter details of sales partner

        const uniqueId0 = `${Math.random().toString(36).substr(2, 9)}`;
        cy.log(`Generated Unique ID: ${uniqueId0}`);

        cy.get('[name="internalIdentifier"]').click().type(`BAS-MZ-${uniqueId0}`);
        cy.get('[name="displayNameDe"]').click().type(partnerType.salesPartner.displayNameDe);
        cy.get('[name="displayNameEn"]').click().type(partnerType.salesPartner.displayNameEn);
        cy.get('[name="displayNameInPartnerDe"]').click().type(partnerType.salesPartner.displayNameInPartnerDe);
        cy.get('[name="displayNameInPartnerEn"]').click().type(partnerType.salesPartner.displayNameInPartnerEn);
        cy.get('[name="displayAsSponsor"]').click();
        cy.get('[name="hasBooth"]').click();

        cy.get('button[type="Submit"]').scrollIntoView().should('be.visible').click();
        
        // Enter details of marketing partner
        cy.get('button').contains('Marketing Partner Types').click();
        cy.get('a[href*="#"]').contains('Create new Marketing PartnerType').click();
        
        const uniqueId1 = `${Math.random().toString(36).substr(2, 9)}`;
        cy.log(`Generated Unique ID: ${uniqueId1}`);

        cy.get('[name="internalIdentifier"]').click().type(`BASTA=2025${uniqueId1}`);

        cy.get('[name="internalIdentifier"]').click().type(`BASTA=2025${uniqueId1}`);
        cy.get('[name="displayNameDe"]').click().type(partnerType.marketingPartner.displayNameDe);
        cy.get('[name="displayNameEn"]').click().type(partnerType.marketingPartner.displayNameEn);
        cy.get('[name="displayNameInPartnerDe"]').click().type(partnerType.marketingPartner.displayNameInPartnerDe);
        cy.get('[name="displayNameInPartnerEn"]').click().type(partnerType.marketingPartner.displayNameInPartnerEn);

        cy.get('button[type="Submit"]').scrollIntoView().should('be.visible').click();
      
        //click on Sales partner type 

        cy.go('back');
        cy.wait(1000)
        cy.go('back');
        cy.wait(1000)
        cy.go('back');

        cy.get('h4 a[href^="/expos/"]').first().click();

        cy.get('button').contains('Partner Types').click();
      
        cy.get('h4 a[href="#"]').eq(0).click();
        cy.wait(3000)
        cy.get('.list').eq(1).scrollIntoView().contains('Create new Sales Partner').click();
        cy.wait(25000); 

        //Enter details for the new sales partner
        cy.get('#frc-name--1782415253').click().type(partnerType.new_sales_partner.name);
        cy.get('#frc-information--324378184').click().type(partnerType.new_sales_partner.information);
        cy.get('[name="headerVideoUrl"]').click().type(partnerType.new_sales_partner.headerVideoUrl);
        cy.get('[path="headerVideoType"]').click();
        cy.get('li[data-value="2"]').click();
        cy.get('[name="websiteUrl"]').click().type(partnerType.new_sales_partner.websiteUrl);
        cy.get('[name="facebookUrl"]').click().type(partnerType.new_sales_partner.facebookUrl);
        cy.get('[name="youTubeUrl"]').click().type(partnerType.new_sales_partner.youTubeUrl);
        cy.get('[name="twitterUrl"]').click().type(partnerType.new_sales_partner.twitterUrl);
        cy.get('[name="instagramUrl"]').click().type(partnerType.new_sales_partner.instagramUrl);
        cy.get('[name="linkedInUrl"]').click().type(partnerType.new_sales_partner.linkedInUrl);
        cy.get('.col-sm-9').eq(0).find('button[type="button"]').click();
        cy.get('#frc-title-1165639234').click().type(partnerType.Reference_details.title);
        cy.get('#frc-subtitle-1141520574').click().type(partnerType.Reference_details.subtitle);
        cy.get('[path="partnerReferences.0.type"]').click();
        cy.get('li[data-value="2"]').click();
        cy.get('#frc-url-34044885').click().type(partnerType.Reference_details.URL);
        const filePath='sample.pdf';
      
        cy.get('#frc-noticeActive-1746937174').click()
        cy.get('[name="noticeHeadline"]').click().type(partnerType.new_sales_partner.noticeHeadline);
        cy.get('[name="noticeBodyText"]').click().type(partnerType.new_sales_partner.noticeBodyText);
        cy.get(`td[data-value="${expo.startDateValue}"]`).eq(1).click();
        cy.get(`td[data-value="${expo.endDateValue}"]`).eq(2).click();
        cy.get('.i18n-message ').contains('Submit').click();

        cy.visit(pageUrls.liveEventsPage);

        cy.get('[name="search"]').click().type('TS update check');
        cy.get('a[href]').contains('TS update check').click();
        cy.get('.children').should('be.visible').contains('Expo').click();
   
   
   
       cy.get('h4 a[href^="/expos/"]').first().click();
   
            cy.get('button').contains('Partner Types').click();
            cy.get('a[href="#"]').eq(2).click();
            cy.wait(3000);
            cy.get('a[href="#"]').eq(6).click();
            cy.get('a[href="#"]').eq(7).click(); 
   
           cy.wait(22000);
           const fileName3 = 'img.jpg';  
           cy.get('input[type="file"]').eq(1).attachFile('img.jpg');
           const fileName4 = 'img4.jpg';  
           cy.get('input[type="file"]').eq(2).attachFile('img4.jpg');
           cy.wait(3000);
           cy.get('.css-1hwfws3').eq(1).click();
           cy.get('body').type('{downarrow}{enter}');
           cy.get('.i18n-message ').contains('Submit').click();
           cy.get('button').contains('Publish').click({force: true});
           cy.wait(1000);
           
           cy.visit(pageUrls.liveEventsPage);
           cy.get('[name="search"]').click().type('TS update check');
        cy.get('a[href]').contains('TS update check').click();
        cy.get('.children').should('be.visible').contains('Expo').click();
   
               



        cy.get('h4 a[href^="/expos/"]').first().click();

        cy.get('button').contains('Partner Types').click();
        cy.get('button').contains('Marketing Partner Types').click();


        // Enter details for the new marketing partner type

        cy.get('button').contains('Marketing Partner Types').click();
        cy.get('h4 a[href="#"]').eq(0).click();
        cy.wait(3000);
        cy.get('.list').eq(1).contains('Create new Marketing Partner').click();
        cy.wait(3000);

        // Enter details for the new sales partner
         cy.get('#frc-name--1782415253').click().type(partnerType.new_marketing_partner.name);
         cy.get('.css-1wy0on6').click();
         cy.wait(1000);
         
         cy.get('.css-dpec0i-option').click();
         cy.get('#frc-information--324378184').click().type(partnerType.new_marketing_partner.information);
         cy.get('[name="headerVideoUrl"]').click().type(partnerType.new_marketing_partner.headerVideoUrl);
         cy.get('[path="headerVideoType"]').click();
         cy.get('li[data-value="2"]').click();
         cy.get('[name="websiteUrl"]').click().type(partnerType.new_marketing_partner.websiteUrl);
         cy.get('[name="facebookUrl"]').click().type(partnerType.new_marketing_partner.facebookUrl);
         cy.get('[name="youTubeUrl"]').click().type(partnerType.new_marketing_partner.youTubeUrl);
         cy.get('[name="twitterUrl"]').click().type(partnerType.new_marketing_partner.twitterUrl);
         cy.get('[name="instagramUrl"]').click().type(partnerType.new_marketing_partner.instagramUrl);
         cy.get('[name="linkedInUrl"]').click().type(partnerType.new_marketing_partner.linkedInUrl);
         cy.get('.i18n-message ').contains('Submit').click();
         
         cy.wait(6000);
        
         cy.get('a[href="#"]').eq(6).click();     
         cy.get('a[href="#"]').eq(7).click();  


          const fileName1 = 'samplefile.jpg';  
          cy.get('input[type="file"]').attachFile('samplefile.jpg');
         cy.wait(2000);

        
         cy.get('.i18n-message ').contains('Submit').click();
         cy.get('button').contains('Publish').click({force: true});
        

       cy.go('back');
       cy.wait(1000)
       cy.go('back');
       cy.wait(1000)
       cy.go('back');
       
      
        //Go to staffs
        cy.get('h4 a[href^="/expos/"]').first().click();
        cy.get('button').contains('Partner Types').click();
        cy.get('a[href*="#"]').eq(2).click();
        
        cy.get('div[style*="float: left"]').eq(3).within(() => {
            // Now find the a[href="#"] inside it and click
            cy.get('a[href="#"]').click();
        });
        
       // cy.get('a[href="#"]').contains('Edit').click();

       cy.get('div[style*="float: right"]').eq(2).within(() => {
        // Now find the a[href="#"] inside it and click
        cy.get('a[href="#"]').click();
    });


        const uniqueId = `${Math.random().toString(36).substr(2, 9)}`;
        cy.log(`Generated Unique ID: ${uniqueId}`);

        cy.get('#frc-forename-283834671').should('be.visible').click().type(`Adam${uniqueId}`);
        cy.get('#frc-surname-1717441631').should('be.visible').click().type(`Gill${uniqueId}`);
        cy.get('#frc-company-178924925').type(`S&S${uniqueId}`);
        cy.get('#frc-position-1324593687').type(`Manager`);
        cy.get('#frc-email-197005799').type(`asaddiqua+${uniqueId}@jax.de`);
        cy.get('#frc-twitter-398771793').click().type(partnerType.new_marketing_partner.twitterUrl);
        cy.get('#frc-facebook-2143609882').click().type(partnerType.new_marketing_partner.facebookUrl);
        cy.get('#frc-linkedIn--2001781566').click().type(partnerType.new_marketing_partner.linkedInUrl);
        cy.get('#frc-bio-33470300').click().type('working as a manager');
        cy.get('#frc-blog-1037670846').click().type('no blog till far');
        cy.get('.i18n-message ').contains('Submit').click();

        

        cy.get('div[style*="float: left"]').eq(4).within(() => {
            // Now find the a[href="#"] inside it and click
            cy.get('a[href="#"]').click();
        });


        cy.get('.right-section').eq(2).find('a[href="#"]').contains('Edit').click();
        const fileName = 'samplefile.jpg';  
        cy.get('input[type="file"]').attachFile('samplefile.jpg');
        cy.wait(3000)
        cy.get('button[type="submit"]').click();
       // cy.get('button[type="button"]').contains('Publish').click();

        cy.go('back');
        cy.wait(1000)
        cy.go('back');
        cy.wait(1000)
        cy.go('back');

        cy.get('h4 a[href^="/expos/"]').first().click();

        cy.get('button').contains('Partner Types').click();
        
        cy.get('a[href="#"]').eq(2).click();
       
        cy.get('.issues').eq(1).find('a[href="#"]').eq(1).click();
        cy.get('#test').click({force: true});
        cy.wait(5000);
        cy.go('back');
        cy.wait(1000)
        cy.go('back');
        cy.wait(1000)
        cy.go('back');

        
   

    
        


    });
});
