
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

});
