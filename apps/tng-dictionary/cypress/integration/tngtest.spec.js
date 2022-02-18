// tngtest.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('My First Test', () => {
    it('Visits the page', () => {
        cy.visit('http://localhost:4200/vocabularyLists/1220322')
    })
})

describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:4200')
    })
})
