describe("Cypress initial setup", () => {
    it("opens the Cypress example application", () => {
        cy.visit("/");

        cy.contains("Kitchen Sink").should("be.visible");
    });
});