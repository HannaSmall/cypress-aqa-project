describe("QAuto header and footer elements", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("finds all header links and buttons", () => {
        cy.get("header .header_logo")
            .should("be.visible")
            .and("have.attr", "href", "/");

        cy.get("header .header_nav").within(() => {
            cy.contains("a", "Home").should("be.visible");
            cy.contains("button", "About").should("be.visible");
            cy.contains("button", "Contacts").should("be.visible");
        });

        cy.get("header .header_right").within(() => {
            cy.contains("button", "Guest log in").should("be.visible");
            cy.contains("button", "Sign In").should("be.visible");
        });
    });

    it("finds all social media links", () => {
        cy.get(
            '#contactsSection a[href="https://www.facebook.com/Hillel.IT.School"]'
        ).should("be.visible");

        cy.get(
            '#contactsSection a[href="https://t.me/ithillel_kyiv"]'
        ).should("be.visible");

        cy.get(
            '#contactsSection a[href*="youtube.com/user/HillelITSchool"]'
        ).should("be.visible");

        cy.get(
            '#contactsSection a[href="https://www.instagram.com/hillel_itschool/"]'
        ).should("be.visible");

        cy.get(
            '#contactsSection a[href="https://www.linkedin.com/school/ithillel/"]'
        ).should("be.visible");
    });

    it("finds contact links and footer logo", () => {
        cy.contains("#contactsSection a", "ithillel.ua")
            .should("be.visible")
            .and("have.attr", "href", "https://ithillel.ua");

        cy.contains("#contactsSection a", "support@ithillel.ua")
            .should("be.visible")
            .and("have.attr", "href", "mailto:developer@ithillel.ua");

        cy.get("footer .footer_logo")
            .should("be.visible")
            .and("have.attr", "href", "/");
    });
});