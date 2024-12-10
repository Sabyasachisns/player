beforeEach(() =>
    {
      cy.visit('http://conf2016qa.sandsmedia.com'); 
    // Enter username and password and click on signin 
        cy.get('body > header > div > nav > ul:nth-child(3) > li:nth-child(3) > a').contains("Sign In").click();
        cy.get('#email').type('asaddiqua@sandsmedia.com');
        cy.get('#password').type('Saddiqua007');
        cy.get('body > section > section > section > section > div > div > div > form > fieldset > div.text-center.form-group.ng-binding > button').click();
        cy.wait(5000);
    })
    
    describe('Event creation', () => {
       it('should create an event successfully', () => {
        const startDate = Cypress.env('startDate');
        const endDate = Cypress.env('endDate');
        const title = Cypress.env('title');
        const name = Cypress.env('name');
        const brandSelections = Cypress.env('brandSelections');
    
        cy.url().should('include', '/');
        cy.contains('Welcome to the S&S Media Call for Papers Tool!').should('be.visible'); 
        cy.get('body > header > div > nav > ul.nav.navbar-nav.ng-scope > li:nth-child(3) > a > span.ng-scope').click();
        cy.contains(/Create Event.*/).click();
        cy.url().should('include', '/events/create');
        cy.contains('New Event').should('be.visible');
        cy.get('[type="checkbox"]').check() 
        cy.get('[type="radio"]').first().check();
        //Event Name
        cy.get('#title').type(title);
        cy.get('#redsysgenre').select('CONFERENCE');
        cy.get('#redsyseventtype').select('HYBRID');
        cy.get('#redsyscertificatetype').select('NONE');
        cy.get('#redsyssupportedapp').select(['ENTWICKLER', 'DEVMIO'], { force: true });
        //Conference or EA
        cy.get('#redsyseventteam').select('CONFERENCE', { force: true }); 
        cy.get('#redsysconforcourse').select('isCourse', { force: true });
       
        //Brand Selector
        brandSelections.forEach(selection => {
          cy.get('.redsys-brand-chooser')
            .eq(selection.index)
            .contains(selection.text)
            .should('be.visible')
            .click();
        });
        //Series
        cy.get('.redsys-instance-item-field').eq(0)
        cy.get('.redsys-instance-creator').eq(0)
        cy.get('.redsys-instance-item-field > :nth-child(1) > .ng-pristine')
        cy.get('.redsys-instance-item-field > :nth-child(1) > .ng-pristine').type('TEST-INSTANCE1');
        cy.get('.redsys-instance-item-field > :nth-child(2) > .ng-pristine').type('https://new.basta.net');
        // cy.get('.redsys-brand-chooser.ng-scope > :nth-child(6)').click();
        
    
        //Tracks
        cy.get('.col-md-6.ng-scope')
        cy.get(':nth-child(1) > .border > span > .fa').click();
        cy.get(':nth-child(2) > .border > span > .fa').click();
        cy.get(':nth-child(3) > .border > span > .fa').click();
        cy.get(':nth-child(4) > .border > span > .fa').click();
        //Talk Types
        cy.get('.redsys-brand-chooser > :nth-child(1) > .ng-scope > .fa').click();
        cy.get('.redsys-brand-chooser > :nth-child(2) > .ng-scope > .fa').click();
        cy.get('.redsys-brand-chooser > :nth-child(3) > .ng-scope > .fa').click();
        cy.get('.redsys-brand-chooser > :nth-child(4) > .ng-scope > .fa').click();

        // cy.get('.redsys-brand-chooser').eq(2)
        // cy.get(':nth-child(1) > .ng-scope > .fa').click();
        // cy.get(':nth-child(2) > .ng-scope > .fa').click();
        // cy.get(':nth-child(3) > .ng-scope > .fa').click();
        // cy.get(':nth-child(4) > .ng-scope > .fa').click();
   
        // //Talk type
        // cy.get('.redsys-brand-chooser').eq(2)
        // .contains('Keynote')
        // .should('be.visible')
        // .click();
        // cy.get('.redsys-brand-chooser').eq(2)
        // .contains('Workshop')
        // .should('be.visible')
        // .click();
        // cy.get('.redsys-brand-chooser').eq(2)
        // .contains('Talk')
        // .should('be.visible')
        // .click();
        // cy.get('.redsys-brand-chooser').eq(2)
        // .contains('Session')
        // .should('be.visible')
        // .click();
      
    //Attatch image
    cy.get('#floorPlan > fieldset > div:nth-child(2) > span > input[type=file]').attachFile('sample.jpg', { 
      subjectType: 'input' 
    });
    cy.get('#floorPlan > fieldset > div:nth-child(3) > button.btn.btn-primary.ng-binding')
      .click({ force: true });
    //Event Date
    cy.get('#startDate').click().clear().type(startDate);
    cy.get('.row.col-xs-12')
    cy.get('.form-group.uib-time.hours').eq(0).clear()
    .type('13');
    cy.get('#endDate').click().clear().type(endDate);
    cy.get('#name').type(name);
    cy.get('#street').type('Stresemann str 76');
    cy.get('#postalCode').type('10963');
    cy.get('#city').type('Berlin');
    cy.get('#country').select('Pakistan');
    cy.get('.col-md-12.text-center > .ng-isolate-scope > fieldset > [ng-hide="uploader.queue.length"] > .btn > input').attachFile('sample.jpg', { 
      subjectType: 'input'
      })
      cy.get('.col-md-12.text-center > .ng-isolate-scope > fieldset > [ng-show="uploader.queue.length"] > .btn-primary').click();
      cy.wait(1000);
      //cy.get('[ng-show="uploader.queue.length"] > .btn-primary').click();
    cy.get(':nth-child(11) > fieldset > .form-group > .btn-default').click();
    });
    });
    
   
    