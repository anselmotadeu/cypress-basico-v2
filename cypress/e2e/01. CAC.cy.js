/// <reference types="Cypress" />
    // o comando acima, faz referência aos comandos do Cypress e intelligence ao passar o mouse em cima do comando

describe ('Central de Atendimento ao Cliente', function() {
    const THREE_SECOND_IN_MS = 3000

    beforeEach(function() {
        cy.visit('app test/index.html')
            // o comando acima acessa um site em questão e neste caso, estou acessando um site local.
    })
    it('verifica o título da aplicação', function() {

            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
                // o comando acima verificar se o título é igual a uma frase informada

    })

    it('preenchimento de formulário', function() {

        cy.clock()

        cy.get('#firstName')
            .click()
            .type('Anselmo')
            .should('be.visible');

        cy.get('#lastName')
            .click()
            .type('Santos')
            .should('be.visible');

        cy.get('#email')
            .click()
            .type('anselmotadeu@exemplo.com')
            .should('be.visible');

        cy.get('#phone')
            .click()
            .type('11912345678')
            .should('be.visible');

        cy.get(':nth-child(4) > input')
            .click();

        cy.get('#email-checkbox')
            .click();

            const longtext = 'Gostaria de agradecer pelo excelente conteúdo, pois estou no início do curso e já aprendi muito.'
                // o comando acima foi criado como uma espécie de variável para que eu não tivesse que digitar tudo no .type('')

        cy.get('#open-text-area')
            .click()
            .type(longtext, {delay: 50})
                // o comando acima foi utilizado para retardar um pouco a velocidade de digitação do  campo
            .should('be.visible');
                // o comando acima foi utilizado para verificar se a mensagem que foi digitada é visível

        cy.contains('.button', 'Enviar')
            .click()
        // cy.contains('span', 'Mensagem enviada com sucesso.')
        cy.get('.success')
            .should('be.visible');

            cy.tick(THREE_SECOND_IN_MS)

            cy.get('.success')
                .should('not.be.visible');

        })

        it('verificar mensagem de erro ao digitar um formato de e-mail errado', function() {

            cy.get('#firstName').type('Anselmo');
            cy.get('#lastName').type('Santos');
            cy.get('#email').type('anselmotadeu@exemplo,com');
            cy.get('#phone').type('11912345678');
            cy.get(':nth-child(4) > input').click();
            cy.get('#email-checkbox').click();
            cy.get('#open-text-area').type('testando', {delay: 0});
            cy.contains('.button', 'Enviar').click();
            cy.get('.error').should('be.visible');

    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {

        cy.get('#phone').clear()
            .type('abcdefghij')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

            cy.get('#firstName').type('Anselmo');
            cy.get('#lastName').type('Santos');
            cy.get('#email').type('anselmotadeu@exemplo,com');
            cy.get(':nth-child(4) > input').click();
            cy.get('#phone-checkbox').check();
            cy.get('#open-text-area').type('testando');
            cy.contains('.button', 'Enviar').click();
            cy.get('.error').should('be.visible');

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName').clear()
            .type('Anselmo')
            .should('have.value', 'Anselmo')
            .clear()
            .should('have.value', '');

        cy.get('#lastName').clear()
            .type('Santos')
            .should('have.value', 'Santos')
            .clear()
            .should('have.value', '');

        cy.get('#email').clear()
            .type('anselmotadeu@exemplo.com')
            .should('have.value', 'anselmotadeu@exemplo.com')
            .clear()
            .should('have.value', '');

        cy.get('#phone').clear()
            .type('11912345678')
            .should('have.value', '11912345678')
            .clear()
            .should('have.value', '');

        cy.get('#open-text-area').clear()
            .type('aqui, vou digitar essa mensagem apenas para testar o "delete" com o comando .clear()', {delay: 50})
            .should('have.value', 'aqui, vou digitar essa mensagem apenas para testar o "delete" com o comando .clear()')
            .clear()
            .should('have.value', '');

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible');

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
            // o comando acima foi criado como uma espécie de variável, onde armazena todas as informações de preenchimento do formulário
            // esse comando foi armazenado na pasta "support", no arquivo "commands.js"
            cy.get('.success').should('be.visible');

    })

    it('verifica mensagem de e-mial com formatação errada', function() {

            cy.get('select').select('Blog') // Seleção pelo texto Blog
            .should('be.visible')

    })

    it('verifica mensagem de e-mial com formatação errada', function() {

        cy.get('select').select('Blog') // Seleção pelo texto Blog
        .should('be.visible')

})

    it('já já eu edito essa mensagem', function() {
        
        cy.get('#product')
            .select('YouTube') // Seleção pelo Nome
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        
        cy.get('#product')
            .select('mentoria') // . Seleção pelo Valor
            .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function() {

        cy.visit('app test/index.html')        
        cy.get('select[id="product"]')                  // esse caminho foi encontrado em inspencionar, no navegador
            .select(1) // . Seleção pelo Indice         // <select id="product">...</select> 
            .should('have.value', 'blog')               // essa é a estrutura para localizar um elemento através do navegador

    })

    it('marca o tipo de atendimento "Feedback"', function() {
        
        cy.get('input[type="radio"][value="feedback"]')  // esse caminho foi encontrado em inspencionar
            .check()                                      // <input type="radio" name="atendimento-tat" value="feedback">
            .should('have.value', 'feedback')             // essa é a estrutura para localizar um elemento através do navegador

    })

    it('marca cada tipo de atendimento', function() {
        
        cy.get('input[type="radio"]')        
            .should('have.length', 3)
                // o comando acima foi utilizando para verificar o "comprimento - length", pois como utilizei uma rota genérica, ele buscou todos os campos com especificação "radio"
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
                // os comandos acima foram utilizados para especificar os seletores de marcação
                // ".each" é para que seja marcado item por item
                // "cy.wrap" é para 'empacotar' esses testes de verificação atraleado ao ".check()" e ".should('be.checked')" para validar se os campos foram selecionados e marcados

    })

})

    it('marca ambos checkboxs, depois desmarca o último', function() {

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

})

it('seleciona um arquivo da pasta fixtures', function() {

    cy.get('input[type="file"]')  // fiz um get para localizar um input do tipo "file"
        .should('not.have.value') // fiz uma validação se esse campo estava vazio e estava
        .selectFile('./cypress/fixtures/example.json')  // utilizei esse comando para selecionar um arquivo do meu próprio arquivo de códigos aqui no vscode
        .should(function($imput) {
            expect($imput[0].files[0].name).to.equal('example.json')
                // o comando acima, foi utilizado para verificar se o arquivo que foi inserido é igual ao nome "example.json"
            
    })

})

it('seleciona um arquivo simulando um drag-and-drop', function() {

    cy.get('input[type="file"]')  // fiz um get para localizar um input do tipo "file"
        .should('not.have.value') // fiz uma validação se esse campo estava vazio e estava
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop' })  // utilizei esse comando para "arrastar" um arquivo do meu próprio arquivo de códigos aqui no vscode
        .should(function($imput) {
        expect($imput[0].files[0].name).to.equal('example.json')
            // o comando acima, foi utilizado para verificar se o arquivo que foi inserido é igual ao nome "example.json"
        
    })
    
})

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json').as('sampleFile')  // podemos passar o caminho completo do arquivo como no exempo anterior, mas podemos também utilizar o comando específico "cy.fixtures", aqui passei um "alias" através de ".a('sampleFile')"
        cy.get('input[type="file"]')  // aqui, fiz um get para localizar nosso campo tipo input
            .selectFile('@sampleFile')  // aqui, fiz a seleção do arquivo com o comando "selectFile" passando o nome da "alias" que passei acima
            .should(function($imput) {
                expect($imput[0].files[0].name).to.equal('example.json')
                    // o comando acima, foi utilizado para verificar se o arquivo que foi inserido é igual ao nome "example.json"
            })        
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
            // o comando acima puxa o que tem "success"
          .should('not.be.visible')
            // o comando acima verifica que não está visível
          .invoke('show')
            // o comando acima força o aparecimento do "success" pesquisado
          .should('be.visible')
            // o comando acima verifica que agora está visível
          .and('contain', 'Mensagem enviada com sucesso.')
            // o comando acima complementa informando a mensagem que deveria aparecer
          .invoke('hide')
            // o comando acima esconde novamente o elemento buscado
          .should('not.be.visible')
            // o comando acima garante que o elemento não está mais visível
        cy.get('.error')
            // o comando acima puxa o que tem "error"
          .should('not.be.visible')
            // o comando acima verifica que não está visível
          .invoke('show')
            // o comando acima força o aparecimento do "error" pesquisado
          .should('be.visible')
            // o comando acima verifica que agora está visível
          .and('contain', 'Valide os campos obrigatórios!')
            // o comando acima complementa informando a mensagem que deveria aparecer
          .invoke('hide')
             // o comando acima esconde novamente o elemento buscado
          .should('not.be.visible')
            // o comando acima garante que o elemento não está mais visível
      })

      it('preenche a area de texto usando o comando invoke', function() {
            const longText1 = Cypress._.repeat('0123456789', 20)

            cy.get('#open-text-area')
                .invoke('val', longText1)
                    .should('have.value', longText1)

      })

      it('faz uma requisição HTTP', function() {

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
                
            })

      })

        it('encontra o gato escondido', function() {

            cy.get('#cat')
                .invoke('show')
                    .should('be.visible')
            cy.get('#title')
                .invoke('text', 'PenseAPPP')
            cy.get('#subtitle')
                .invoke('text', 'Agora eu estou brabissímo com o Cypress')
        })

    })