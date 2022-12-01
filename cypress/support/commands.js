Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type('Anselmo');
            cy.get('#lastName').type('Santos');
            cy.get('#email').type('anselmotadeu@outlook.com');
            cy.get('#phone').type('11982485041');
            cy.get(':nth-child(4) > input').click();
            cy.get('#email-checkbox').click();
            cy.get('#open-text-area').type('testando');
            cy.contains('.button', 'Enviar').click();
})