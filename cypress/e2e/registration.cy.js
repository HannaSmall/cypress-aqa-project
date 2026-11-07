const email = `anna${Date.now()}@test.com`;
const password = "Password123";

describe("Registration", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.contains("button", "Sign up").click();
    });

    it("shows the registration form", () => {
        cy.contains("h4", "Registration").should("be.visible");

        cy.get("#signupName").should("be.visible");
        cy.get("#signupLastName").should("be.visible");
        cy.get("#signupEmail").should("be.visible");
        cy.get("#signupPassword").should("be.visible");
        cy.get("#signupRepeatPassword").should("be.visible");

        cy.contains("button", "Register").should("be.disabled");
    });

    it("shows errors when required fields are empty", () => {
        cy.get("#signupName").click().blur();
        cy.contains("Name required").should("be.visible");
        cy.get("#signupName").should(
            "have.css",
            "border-color",
            "rgb(220, 53, 69)"
        );

        cy.get("#signupLastName").click().blur();
        cy.contains("Last name required").should("be.visible");

        cy.get("#signupEmail").click().blur();
        cy.contains("Email required").should("be.visible");

        cy.get("#signupPassword").click().blur();
        cy.contains("Password required").should("be.visible");

        cy.get("#signupRepeatPassword").click().blur();
        cy.contains("Re-enter password required").should("be.visible");

        cy.contains("button", "Register").should("be.disabled");
    });
    it("shows errors for invalid registration data", () => {
    cy.get("#signupName").type("A1").blur();
    cy.contains("Name is invalid").should("be.visible");

    cy.get("#signupLastName").type("B2").blur();
    cy.contains("Last name is invalid").should("be.visible");

    cy.get("#signupEmail").type("wrong-email").blur();
    cy.contains("Email is incorrect").should("be.visible");

    cy.get("#signupPassword").type("password").blur();
    cy.contains(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    ).should("be.visible");

    cy.get("#signupRepeatPassword").type("Another123").blur();
    cy.contains("Passwords do not match").should("be.visible");

    cy.contains("button", "Register").should("be.disabled");
});
it("registers a new user with valid data", () => {
    cy.get("#signupName").type("Anna");
    cy.get("#signupLastName").type("Tester");
    cy.get("#signupEmail").type(email);

    cy.get("#signupPassword").type(password, {
        sensitive: true,
    });

    cy.get("#signupRepeatPassword").type(password, {
        sensitive: true,
    });

    cy.contains("button", "Register")
        .should("be.enabled")
        .click();

    cy.url().should("include", "/panel/garage");
    cy.contains("Garage").should("be.visible");
});

it("shows errors for incorrect field length", () => {
    cy.get("#signupName").type("A").blur();

    cy.contains(
        "Name has to be from 2 to 20 characters long"
    ).should("be.visible");

    cy.get("#signupLastName")
        .type("A".repeat(21))
        .blur();

    cy.contains(
        "Last name has to be from 2 to 20 characters long"
    ).should("be.visible");

    cy.get("#signupPassword")
        .type("Aa123", { sensitive: true })
        .blur();

    cy.contains(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    ).should("be.visible");

    cy.contains("button", "Register").should("be.disabled");
});
});

describe("Login with custom command", () => {
    it("logs in with the registered user", () => {
        cy.login(email, password);

        cy.url().should("include", "/panel/garage");
        cy.contains("Garage").should("be.visible");
        cy.contains("My profile").should("be.visible");
    });
});