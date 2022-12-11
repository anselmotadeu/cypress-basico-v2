/// <reference types="Cypress" />
    // o comando acima, faz referência aos comandos do Cypress e intelligence ao passar o mouse em cima do comando

        it('faz uma requisição HTTP', function() {

            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should(function (response) {
                    const { status, statusText, body } = response
                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK')
                    expect(body).to.include('CAC TAT')
                    
                })

                it('fails with 401 (Unauthorized) status code when access token is missing', () => {
                    cy.request({
                      method: 'GET',
                      url: 'https://api.typeform.com/me',
                      failOnStatusCode: false,
                    }).should(({ status, body }) => {
                      expect(status).to.equal(401)
                      expect(body).includes('AUTHENTICATION_FAILED')
                      expect(body)
                        .includes('Authentication credentials not found on the Request Headers')
                      // Or
                      const bodyObj = JSON.parse(body)
                      const { code, description } = bodyObj
                      expect(code).to.equal('AUTHENTICATION_FAILED')
                      expect(description)
                        .to.equal('Authentication credentials not found on the Request Headers')
                    })
                  })

                  it('fails with 404 (Not Found) status code when url does not exist', () => {
                    cy.request({
                      method: 'GET',
                      url: 'https://walmyr.dev/invalid-123',
                      failOnStatusCode: false,
                    }).should(({ status, statusText }) => {
                      expect(status).to.equal(404)
                      expect(statusText).to.equal('Not Found')
                    })
                  })
    

    })