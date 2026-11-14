class GaragePage {
    visit() {
        cy.visit("/panel/garage");
    }

    addCar(brand, model, mileage) {
        cy.contains("button", "Add car").click();
        cy.get("#addCarBrand").select(brand);
        cy.get("#addCarModel").select(model);
        cy.get("#addCarMileage").clear().type(mileage);
        cy.get(".modal-footer").contains("button", "Add").click();
    }

    verifyCarIsAdded(brand, model) {
        cy.contains(".car_name", `${brand} ${model}`)
            .should("be.visible");
    }
}

module.exports = new GaragePage();