describe("Gerenciamento de estudos", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.reload();
  });

  it("deve permitir cadastrar uma sessão de estudo", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Introdução ao Spring Boot");
    cy.get("#tecnologia-estudo").type("Java");
    cy.get("#duracao-estudo").type("120");
    cy.get("#data-estudo").type("2026-11-06");
    cy.get("#descricao-estudo").type("Estudo sobre criação de APIs REST");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Introdução ao Spring Boot").should("be.visible");
    cy.contains("Tecnologia: Java").should("be.visible");
    cy.contains("Duração: 120 minutos").should("be.visible");
    cy.contains("Data: 2026-11-06").should("be.visible");

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(1);
      expect(estudos[0].tema).to.equal("Introdução ao Spring Boot");
      expect(estudos[0].tecnologia).to.equal("Java");
      expect(estudos[0].duracao).to.equal(120);
      expect(estudos[0].data).to.equal("2026-11-06");
    });
  });

  it("deve permitir excluir uma sessão de estudo", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo temporário");
    cy.get("#tecnologia-estudo").type("JavaScript");
    cy.get("#duracao-estudo").type("60");
    cy.get("#data-estudo").type("2026-11-06");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Estudo temporário").should("be.visible");

    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    cy.contains("article", "Estudo temporário").find("button").click();

    cy.contains("Estudo temporário").should("not.exist");

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(0);
    });
  });
});
