class ExpensesPage {
    visit() {
        cy.visit("/panel/expenses");
    }

    addExpense(mileage, liters, totalCost) {
        cy.contains("button", "Add an expense").click();
        cy.get("#addExpenseMileage").clear().type(mileage);
        cy.get("#addExpenseLiters").clear().type(liters);
        cy.get("#addExpenseTotalCost").clear().type(totalCost);
        cy.get(".modal-footer").contains("button", "Add").click();
    }

    verifyExpenseIsAdded(mileage) {
        cy.contains("td", mileage).should("be.visible");
    }
}

module.exports = new ExpensesPage();