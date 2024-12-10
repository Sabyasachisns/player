const { should } = require("chai");

describe('Create Expo and Check Publish Status', () => {
  

  let testExecuted = false;
  let formData = {};
  const uniqueSuffix = Date.now();

  const query = `
    query Author($slug: String!) {
      author(slug: $slug) {
        Author {
          title
          slug
          forename
          surname
          company
        }
      }
    }
  `;
  before(() => {
    formData = {
      title: `Ayesha-title-${uniqueSuffix}`,
      slug: `ayesha-author-slug-${uniqueSuffix}`,
      forename: `AyeshaAuthor-${uniqueSuffix}`,
      surname: `sandsmedia-${uniqueSuffix}`,
      company: `sandsmedia-${uniqueSuffix}`,
    };
  });
  
  
  
  
  beforeEach(() => {

      
        cy.fixture('ConfigFSLE.json').as('ConfigFSLE');
        

        cy.intercept('POST', '/graphql', (req) => {
            req.headers['Host'] = 'redsys-stage.sandsmedia.com';
            req.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:1270) Gecko/20100101 Firefox/127.0';
            req.headers['Accept'] = '*/*';
            req.headers['Accept-Language'] = 'en-US,en;q=0.5';
            req.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd';
            req.headers['Referer'] = 'https://redsys-stage.sandsmedia.com/live_events';
            req.headers['Content-Type'] = 'application/json';
            req.headers['Authorization'] = 'Cpo9Wjpj1W8Q_hKvI2rhWJ9jAnn0ZxNkQQYrW-_kWar';
            req.headers['Origin'] = 'https://redsys-stage.sandsmedia.com';
            req.headers['Connection'] = 'keep-alive';
            req.headers['Cookie'] = '_ga=GA1.2.1341232542.1640013434; _ga_R65MMCZ1X5=GS1.2.1702042552.10.1.1702043330.0.0.0; meteor_login_token=DhRX0DvjvQX8FzRXX9RPK4K9Uzpq_rOv2nEYOHaRuGW';
            req.headers['Sec-Fetch-Dest'] = 'empty';
            req.headers['Sec-Fetch-Mode'] = 'cors';
            req.headers['Sec-Fetch-Site'] = 'same-origin';
            req.headers['Priority'] = 'u=4';
            req.headers['TE'] = 'trailers';
        }).as('graphql');
        cy.setCookie('meteor_login_token', 'Cpo9Wjpj1W8Q_hKvI2rhWJ9jAnn0ZxNkQQYrW-_kWar'); // Replace with your domain
    });

    it('should visit the authors, create a new author, upload an image, and verify data through GraphQL', function() { // Change arrow function to function expression
      const { FSLE } = this.ConfigFSLE; // Use 'this.testData' in function expression context
      cy.visit('https://redsys-stage.sandsmedia.com/live_events?option=blockbusters');
  
       cy.get('.MuiButton-label-7').eq(12).should('be.visible').click().type(formData.title);
      cy.contains('new FSLE').click();
      cy.wait(10000);
      cy.get('.css-1hwfws3').eq(0).click();
      cy.get('[tabindex="-1"]').contains('Lesson').click();
      cy.get('.css-1hwfws3').eq(1).click();
      cy.get('[tabindex="-1"]').contains('Schedule list').click();
  
    //   //Fill in form fields
     
      cy.get('#frc-knowHowTextEn-1671167693').should('be.visible').clear().click().type('Expert knowledge');
      cy.get('#frc-knowHowTextDe-1671166453').should('be.visible').clear().click().type('Expertenwissen ');
      cy.get('#frc-learnSpeedTextEn--1326202304').should('be.visible').clear().click().type('Expertenwissen ');
      cy.get('#frc-learnSpeedTextDe--1326203544').should('be.visible').clear().click().type('Expertenwissen ');
      cy.get('#frc-professionalsTextEn-2125208095').should('be.visible').clear().click().type('Expertenwissen ');
      cy.get('#frc-professionalsTextDe-2125206855').should('be.visible').clear().click().type('Expertenwissen ');
      cy.get('#frc-name--1782415253').should('be.visible').clear().click().type(FSLE.name);
      cy.get('#frc-slogan--66047816').should('be.visible').clear().click().type('Java is a multiplatform, object-oriented programming language that runs on billions of devices worldwide.');
      cy.get('#frc-description--837447522').should('be.visible').clear().click().type(FSLE.description);
  
      cy.get('.css-1hwfws3').eq(2).click();
      cy.get('[tabindex="-1"]').contains('HYBRID').click();
      cy.get('.css-1hwfws3').eq(3).click();
      cy.get('[tabindex="-1"]').contains('BASIC').click();
      cy.get('.css-1hwfws3').eq(4).click();
      cy.get('[tabindex="-1"]').contains('CONFERENCE').click();
      cy.get('[role="button"]').eq(0).click();

      cy.get('[role="option"]').eq(1).click();



      cy.get('.css-1hwfws3').eq(6).click();
      cy.get('[tabindex="-1"]').contains('Angular Camp Live-Events').click();


      

      cy.get('[data-value="23"]').eq(0).click();
      cy.get('[data-value="24"]').eq(1).click();
      //cy.get('[data-value="23"]').eq(3).click();

      const uniqueId1 = `${Math.random().toString(36).substr(2, 9)}`;
      cy.log(`Generated Unique ID: ${uniqueId1}`);

      cy.get('#frc-slug-1053376469').click().type(`cypress${uniqueId1}`);
      cy.get('#frc-marketingUrl-2133119791').click().type(`cypress${uniqueId1}.com`);
      cy.get('#frc-colourHexCode--580351549').click().type(`#224679`);
      cy.get('#frc-headlineColourHexCode-616139814').click().type(`#224674`);

      
      cy.get('.css-1hwfws3').eq(7).click();
      cy.get('[tabindex="-1"]').contains('cbrueckner+testcoupon@jax.de').should('be.visible').click();
      cy.get('#frc-contactEmail-1308384488').click().type(`sabya${uniqueId1}@gmail.com`);
      cy.get('.css-1hwfws3').eq(8).click();
      cy.get('body').type('{downarrow}{downarrow}{enter}');
     
      cy.get('.i18n-message ').contains('Submit').click();
      cy.wait(2000)

      //Fill the form Lessons

      cy.get('input[placeholder="Search"]').click().type(FSLE.name);
      cy.get('h4 a[href^="/fsles/"]').contains(FSLE.name).click();
      cy.wait(1000);
      
      cy.contains('Lessons').click();
      cy.contains('new Lesson').click();

      cy.get('#frc-name--1782415253').click().type(FSLE.LessonName);
      cy.get('#frc-description--837447522').click().type(FSLE.LessonDescription);
      cy.get('[role="button"]').eq(0).click();
      cy.get('[role="option"]').eq(2).click();
      cy.get('.css-1hwfws3').eq(0).click();
      cy.get('[tabindex="-1"]').contains(FSLE.POCType).click();
      cy.get('[data-value="23"]').eq(0).click();
      cy.get('[data-value="24"]').eq(1).click();
      cy.get('[data-value="25"]').eq(2).click();
      cy.get('#frc-articleSubtitle-1141520574').click().type(FSLE.Subtitle);
      const filePath='sample.pdf';
      cy.get(".dropzone-base").attachFile(filePath, { subjectType: 'drag-n-drop' });
      cy.wait(1000);
      cy.get('#frc-videoUrl--650287366').click().type(FSLE.Subtitle);
      cy.get('[role="button"]').eq(0).click();
      cy.get('[role="option"]').eq(1).click();

      const uniqueId0 = `${Math.random().toString(36).substr(2, 9)}`;
        cy.log(`Generated Unique ID: ${uniqueId0}`);
        cy.get('#frc-slug-1053376469').click().type(`lesson${uniqueId0}`);
        cy.get('.css-1hwfws3').eq(1).click();
        cy.get('[tabindex="-1"]').contains('Jan Stamer').click();
        cy.get('[role="button"]').eq(2).click();
        cy.get('[role="option"]').eq(1).click();
        cy.get('.css-1hwfws3').eq(2).click();
        cy.get('[tabindex="-1"]').contains('.NET 6 Workshop 2022').click();

        cy.get('.i18n-message ').contains('Submit').click();

        //Edit Lesson 

        cy.get('h4 a[href="#"]').contains(FSLE.LessonName).click();
        cy.get('a[href="#"]').eq(1).click();
        const filePath1='lesson1.jpg';
        cy.get(".dropzone-base").eq(0).attachFile(filePath1, { subjectType: 'drag-n-drop' });
        cy.wait(1000);
        const filePath2='lesson2.jpg';
        cy.get(".dropzone-base").eq(1).attachFile(filePath2, { subjectType: 'drag-n-drop' });
        cy.wait(1000);
        const filePath3='lesson3.jpg';
        cy.get(".dropzone-base").eq(2).attachFile(filePath3, { subjectType: 'drag-n-drop' });
        cy.get('.i18n-message ').contains('Submit').click();
        
        //Publish Lessons

        cy.contains('General Information').click();

       
        cy.visit('https://redsys-stage.sandsmedia.com/live_events?option=blockbusters');
        cy.get('.MuiButton-label-7').eq(12).should('be.visible').click().type(formData.title);
        cy.get('input[placeholder="Search"]').click().type(FSLE.name);
        cy.get('h4 a[href^="/fsles/"]').contains(FSLE.name).click();
        cy.wait(1000);

        cy.contains('Revise').click();
        cy.wait(2000);
        cy.visit('https://redsys-stage.sandsmedia.com/live_events?option=blockbusters');
        cy.get('.MuiButton-label-7').eq(12).should('be.visible').click().type(formData.title);
        cy.get('input[placeholder="Search"]').click().type(FSLE.name);
        cy.get('h4 a[href^="/fsles/"]').contains(FSLE.name).click();
        cy.wait(1000);

        cy.contains('Publish').click();







      







      

     




      





  
  
  
  
  
  
  
  
       
      
  
    });
  });
  