const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
    ...baseConfig,

    env: {
        ...baseConfig.env,
        userEmail: "anna.qauto2.20261114@test.com",
        userPassword: "Password123",
    },

    e2e: {
        ...baseConfig.e2e,
        baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",
    },
});