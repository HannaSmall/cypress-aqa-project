const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,

    retries: {
        runMode: 2,
        openMode: 0,
    },

    screenshotOnRunFailure: true,
    video: false,

    reporter: "mochawesome",

reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: "QAuto Cypress Test Report",
},

    e2e: {
        specPattern: "cypress/e2e/**/*.cy.js",
        supportFile: "cypress/support/e2e.js",

        setupNodeEvents(on, config) {
            return config;
        },
    },
});