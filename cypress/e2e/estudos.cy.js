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

  it("deve manter o estudo quando a exclusão for cancelada", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo protegido");
    cy.get("#tecnologia-estudo").type("Python");
    cy.get("#duracao-estudo").type("90");
    cy.get("#data-estudo").type("2026-11-06");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Estudo protegido").should("be.visible");

    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false);
    });

    cy.contains("article", "Estudo protegido").find("button").click();

    cy.contains("Estudo protegido").should("be.visible");

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(1);
    });
  });

  it("deve permitir cancelar o cadastro de um estudo", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo não cadastrado");
    cy.get("#tecnologia-estudo").type("JavaScript");

    cy.get("#btn-cancelar-estudo").click();

    cy.get("#form-estudo").should("not.be.visible");

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(0);
    });

    cy.contains("Estudo não cadastrado").should("not.exist");
  });

  it("deve manter o estudo salvo após atualizar a página", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo de testes automatizados");
    cy.get("#tecnologia-estudo").type("Cypress");
    cy.get("#duracao-estudo").type("120");
    cy.get("#data-estudo").type("2026-11-06");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Estudo de testes automatizados").should("be.visible");

    cy.reload();

    cy.contains("Estudo de testes automatizados").should("be.visible");
    cy.contains("Tecnologia: Cypress").should("be.visible");
    cy.contains("Duração: 120 minutos").should("be.visible");
  });

  it("deve manter o estudo excluído após atualizar a página", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo para exclusão");
    cy.get("#tecnologia-estudo").type("JavaScript");
    cy.get("#duracao-estudo").type("60");
    cy.get("#data-estudo").type("2026-11-09");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Estudo para exclusão").should("be.visible");

    cy.window().then((win) => {
        cy.stub(win, "confirm").returns(true);
    });

    cy.contains("article", "Estudo para exclusão")
        .find("button")
        .click();

    cy.contains("Estudo para exclusão").should("not.exist");

    cy.reload();

    cy.contains("Estudo para exclusão").should("not.exist");

    cy.window().then((win) => {
        const estudos = JSON.parse(
            win.localStorage.getItem("devtrack-estudos") || "[]"
        );

        expect(estudos).to.have.length(0);
    });
});

  it("não deve cadastrar um estudo com duração igual a zero", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo inválido");
    cy.get("#tecnologia-estudo").type("JavaScript");
    cy.get("#duracao-estudo").type("0");
    cy.get("#data-estudo").type("2026-11-09");

    cy.contains("button", "Salvar estudo").click();

    cy.get("#duracao-estudo").should(($input) => {
      expect($input[0].validity.rangeUnderflow).to.be.true;
      expect($input[0].validity.valid).to.be.false;
    });

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(0);
    });
  });

  it("não deve cadastrar um estudo com duração superior a 1000 minutos", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo inválido");
    cy.get("#tecnologia-estudo").type("JavaScript");
    cy.get("#duracao-estudo").type("1001");
    cy.get("#data-estudo").type("2026-11-09");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alerta");
    });

    cy.contains("button", "Salvar estudo").click();

    cy.get("@alerta").should(
      "have.been.calledWith",
      "Informe uma duração em minutos maior que zero e menor ou igual a 1000."
    );

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]"
      );

      expect(estudos).to.have.length(0);
    });
  });

  it("não deve cadastrar um estudo com duração decimal", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo inválido");
    cy.get("#tecnologia-estudo").type("Python");
    cy.get("#duracao-estudo").invoke("attr", "step", "any");
    cy.get("#duracao-estudo").type("30.5");
    cy.get("#data-estudo").type("2026-11-09");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alerta");
    });

    cy.contains("button", "Salvar estudo").click();

    cy.get("@alerta").should(
      "have.been.calledWith",
      "Informe uma duração em minutos maior que zero e menor ou igual a 1000."
    );

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]"
      );

      expect(estudos).to.have.length(0);
    });
  });

  it("deve permitir cadastrar um estudo sem descrição", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo de SQL");
    cy.get("#tecnologia-estudo").type("SQL");
    cy.get("#duracao-estudo").type("60");
    cy.get("#data-estudo").type("2026-11-09");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Estudo de SQL").should("be.visible");

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(1);
      expect(estudos[0].descricao).to.equal("");
    });
  });

  it("deve permitir cadastrar vários estudos sem sobrescrever os anteriores", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo de Java");
    cy.get("#tecnologia-estudo").type("Java");
    cy.get("#duracao-estudo").type("60");
    cy.get("#data-estudo").type("2026-11-08");

    cy.contains("button", "Salvar estudo").click();

    cy.get("#btn-adicionar-estudo").click();

    cy.get("#tema-estudo").type("Estudo de Python");
    cy.get("#tecnologia-estudo").type("Python");
    cy.get("#duracao-estudo").type("90");
    cy.get("#data-estudo").type("2026-11-09");

    cy.contains("button", "Salvar estudo").click();

    cy.contains("Estudo de Java").should("be.visible");
    cy.contains("Estudo de Python").should("be.visible");

    cy.get(".cartao-estudo").should("have.length", 2);

    cy.window().then((win) => {
      const estudos = JSON.parse(
        win.localStorage.getItem("devtrack-estudos") || "[]",
      );

      expect(estudos).to.have.length(2);
      expect(estudos[0].tema).to.equal("Estudo de Java");
      expect(estudos[1].tema).to.equal("Estudo de Python");
    });
  });

  it("deve exibir os estudos do mais recente para o mais antigo", () => {
    cy.contains("button", "Registrar estudo").click();

    cy.get("#tema-estudo").type("Estudo antigo");
    cy.get("#tecnologia-estudo").type("Java");
    cy.get("#duracao-estudo").type("60");
    cy.get("#data-estudo").type("2026-11-06");

    cy.contains("button", "Salvar estudo").click();

    cy.get("#btn-adicionar-estudo").click();

    cy.get("#tema-estudo").type("Estudo recente");
    cy.get("#tecnologia-estudo").type("Python");
    cy.get("#duracao-estudo").type("90");
    cy.get("#data-estudo").type("2026-11-09");

    cy.contains("button", "Salvar estudo").click();

    cy.get(".cartao-estudo").first().should("contain", "Estudo recente");

    cy.get(".cartao-estudo").last().should("contain", "Estudo antigo");
  });
});
