
describe("Dashboard do DevTrack", () => {

  it("deve carregar a página inicial corretamente", () => {
    cy.visit("/");

    cy.contains("DevTrack").should("be.visible");
  });

});
