/// <reference types="cypress" />

context('Application', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	// https://on.cypress.io/interacting-with-elements

	it('Todo@Add - Add a Item in the Todo list', () => {

		const text = 'My first item in todo List'

		cy.get('.form-control')
			.type( text ).should('have.value', text)
			.type('{enter}')

		cy.get('.list-group-item:first-child .custom-control-label')
			.should('have.text', text)
	})
})
