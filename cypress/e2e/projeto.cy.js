
describe("Gerenciamento de projetos", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.reload();
  });

  it("deve permitir cadastrar um projeto", () => {

    cy.contains("button", "Adicionar projeto").click();

    cy.get("#nome-projeto").type("Sistema Bancário");
    cy.get("#tecnologias-projeto").type("Java, Spring Boot");
    cy.get("#descricao-projeto").type("API REST para gerenciamento bancário");

    cy.contains("button", "Salvar projeto").click();

    cy.contains("Sistema Bancário").should("be.visible");
    cy.contains("Java, Spring Boot").should("be.visible");

  });


  it("deve permitir excluir um projeto", () => {

    cy.contains("button", "Adicionar projeto").click();

    cy.get("#nome-projeto").type("Projeto temporário");
    cy.get("#tecnologias-projeto").type("JavaScript");
    cy.get("#descricao-projeto").type("Projeto para testar exclusão");

    cy.contains("button", "Salvar projeto").click();

    cy.contains("Projeto temporário").should("be.visible");

    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    cy.contains("article", "Projeto temporário")
      .find("button")
      .click();

    cy.contains("Projeto temporário").should("not.exist");

  });

  it("deve manter o projeto salvo após atualizar a página", () => {

    cy.contains("button", "Adicionar projeto").click();

    cy.get("#nome-projeto").type("Projeto persistente");
    cy.get("#tecnologias-projeto").type("JavaScript, HTML e CSS");
    cy.get("#descricao-projeto").type("Teste de persistência no LocalStorage");

    cy.contains("button", "Salvar projeto").click();

    
    cy.contains("Projeto persistente").should("be.visible");

    cy.reload();
    
    cy.contains("Projeto persistente").should("be.visible");
    cy.contains("JavaScript, HTML e CSS").should("be.visible");

  });

});
