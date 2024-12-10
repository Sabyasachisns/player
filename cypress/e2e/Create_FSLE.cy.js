const { should } = require("chai");
import 'cypress-file-upload';

describe('Author Management Tests', () => {
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

  beforeEach(function() {  // Change arrow function to function expression
    if (testExecuted) return;
    cy.fixture('ConfigFSLE.json').as('ConfigFSLE'); // Load the fixture file and alias it as 'testData'

    cy.intercept('POST', '/graphql', (req) => {
      req.headers['Host'] = 'redsys-stage.sandsmedia.com';
      req.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0';
      req.headers['Accept'] = '*/*';
      req.headers['Accept-Language'] = 'en-US,en;q=0.5';
      req.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd';
      req.headers['Referer'] = 'https://redsys-stage.sandsmedia.com/authors';
      req.headers['Content-Type'] = 'application/json';
      req.headers['Authorization'] = 'wSQhuL8sgTL44lMDUkHMAb_c8SxLO1_I3tmHhzQ6yOZ';
      req.headers['Origin'] = 'https://redsys-stage.sandsmedia.com';
      req.headers['Connection'] = 'keep-alive';
      req.headers['Cookie'] = '_ga=GA1.2.1341232542.1640013434; _ga_R65MMCZ1X5=GS1.2.1702042552.10.1.1702043330.0.0.0; meteor_login_token=wSQhuL8sgTL44lMDUkHMAb_c8SxLO1_I3tmHhzQ6yOZ';
      req.headers['Sec-Fetch-Dest'] = 'empty';
      req.headers['Sec-Fetch-Mode'] = 'cors';
      req.headers['Sec-Fetch-Site'] = 'same-origin';
      req.headers['Priority'] = 'u=4';
      req.headers['TE'] = 'trailers';
    }).as('graphql');

    cy.setCookie('meteor_login_token', 'wSQhuL8sgTL44lMDUkHMAb_c8SxLO1_I3tmHhzQ6yOZ');
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

    // Fill in form fields
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
    // cy.get('svg[viewBox="0 0 24 24"]').eq(9).click({force: true});
    // cy.get('li[data-value="EN"]').click();

    cy.get('.css-1hwfws3').eq(5).click();
    cy.get('[tabindex="-1"]').contains('Angular Camp').click();








    cy.get('#frc-company--1859029625').scrollIntoView().should('be.visible').click().type(formData.company);

    cy.get('.submit-button').scrollIntoView().should('be.visible').click();
    cy.wait(5000);

    cy.get('.jss431 > h3').should('be.visible').and('have.text', 'Public Info');
    cy.get('.jss468').should('be.visible').click();
    cy.wait(5000);

    cy.get('.input-avatarSquare > .form-group > .col-sm-9 > .small-image-base input[type="file"]').eq(0)
      .attachFile('samplefile.jpg', { force: true });

    cy.wait(5000);
    cy.get('.submit-button').scrollIntoView().should('be.visible').click();
    cy.contains('Republish').should('be.visible').click();
    cy.wait(10000);

    cy.setCookie('session_id', 'wSQhuL8sgTL44lMDUkHMAb_c8SxLO1_I3tmHhzQ6yOZ');
    cy.setCookie('auth_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBVc2VySWQiOiI1Yzc2YTE1ZTVjZmI0NGI1MGQ3NGM3ODkiLCJpYXQiOjE1NTEyNzg0MzAsImV4cCI6MTU1NDczNDQzMH0.LA-y1ZyE6Tx6tXNchlYlR963Gm-NBbmCZRZ_SS7n5As');

    cy.request({
      method: 'POST',
      url: 'https://concord-stage.sandsmedia.com/graphql',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBVc2VySWQiOiI1Yzc2YTE1ZTVjZmI0NGI1MGQ3NGM3ODkiLCJpYXQiOjE1NTEyNzg0MzAsImV4cCI6MTU1NDczNDQzMH0.LA-y1ZyE6Tx6tXNchlYlR963Gm-NBbmCZRZ_SS7n5As'
      },
      body: {
        query,
        variables: { slug: formData.slug}
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body)); 
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.not.exist;

      const authorData = response.body.data.author?.Author; // Use optional chaining to avoid null issues
      if (authorData) {
        expect(authorData.slug).to.equal(formData.slug);
        expect(authorData.forename).to.equal(formData.forename);
        expect(authorData.surname).to.equal(formData.surname);
        expect(authorData.company).to.equal(formData.company);
      } else {
        throw new Error('Author data is null');
      }
    });

    testExecuted = true;
  });
});


















