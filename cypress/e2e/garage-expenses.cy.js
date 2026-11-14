const garagePage = require("../pages/GaragePage");
const expensesPage = require("../pages/ExpensesPage");

describe("Garage and fuel expenses", () => {
    beforeEach(() => {
        cy.login();
    });

    it("adds a car and fuel expense", () => {
        garagePage.visit();
        garagePage.addCar("Audi", "TT", "1000");
        garagePage.verifyCarIsAdded("Audi", "TT");

        expensesPage.visit();
        expensesPage.addExpense("1100", "40", "70");
        expensesPage.verifyExpenseIsAdded("1100");
    });
});