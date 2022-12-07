/// <reference types="Cypress" />
    // o comando acima, faz referência aos comandos do Cypress e intelligence ao passar o mouse em cima do comando

    Cypress._.times(5, function() {

        describe('Central de Atendimento ao Cliente TAT', function() {
            it('testa a página da política de privacidade de forma independente', function() {
                
                cy.visit('./cypress-basico-v2/src/privacy.html')
                    cy.contains('Penseapp').should('be.visible')

    })

    })
  })