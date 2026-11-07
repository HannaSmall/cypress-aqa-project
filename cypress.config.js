const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1440,
    viewportHeight: 900,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,

    screenshotOnRunFailure: true,
    video: false,

    retries: {
        runMode: 2,
        openMode: 0
    },

    e2e: {
       baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
        specPattern: "cypress/e2e/**/*.cy.js",
        supportFile: "cypress/support/e2e.js",

        setupNodeEvents(on, config) {
            return config;
        }
    }
});

