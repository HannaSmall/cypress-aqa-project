const expensesPage = require("../pages/ExpensesPage");
const garagePage = require("../pages/GaragePage");

describe("Garage API interception", () => {
  beforeEach(() => {
    cy.login();
  });

  it("creates a car through UI and validates it through API", () => {
    const brand = "Audi";
    const model = "TT";
    const mileage = 1000;

    // Начинаем следить за запросом ДО нажатия кнопки Add
    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.visit();
    garagePage.addCar(brand, model, mileage);

    cy.wait("@createCar").then(({ response }) => {
      // Проверяем ответ создания машины
      expect(response.statusCode).to.equal(201);
      expect(response.body.status).to.equal("ok");

      const createdCarId = response.body.data.id;

      expect(createdCarId).to.be.a("number");

      // Получаем список всех машин через API
      cy.request("GET", "/api/cars").then((carsResponse) => {
        expect(carsResponse.status).to.equal(200);
        expect(carsResponse.body.status).to.equal("ok");
        expect(carsResponse.body.data).to.be.an("array");

        const createdCar = carsResponse.body.data.find(
          (car) => car.id === createdCarId,
        );

        expect(createdCar).to.exist;
        expect(createdCar.id).to.equal(createdCarId);
        expect(createdCar.brand).to.equal(brand);
        expect(createdCar.model).to.equal(model);
        expect(createdCar.mileage).to.equal(mileage);
      });

      const expenseData = {
  carId: createdCarId,
  reportedAt: new Date().toISOString().split("T")[0],
  mileage: 1100,
  liters: 40,
  totalCost: 70,
};

cy.createExpenseViaApi(expenseData).then((expenseResponse) => {
  expect(expenseResponse.status).to.equal(200);
  expect(expenseResponse.body.status).to.equal("ok");

  expect(expenseResponse.body.data.carId).to.equal(createdCarId);
  expect(expenseResponse.body.data.mileage).to.equal(
    expenseData.mileage,
  );
  expect(expenseResponse.body.data.liters).to.equal(
    expenseData.liters,
  );
  expect(expenseResponse.body.data.totalCost).to.equal(
    expenseData.totalCost,
  );

  expensesPage.visit();
expensesPage.verifyExpenseIsAdded(expenseData.mileage);

});

    });
  });
});