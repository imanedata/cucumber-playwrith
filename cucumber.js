module.exports = {       
   reporter: "allure-playwright",
    default: {
      require: [
        "step-definitions/**/*.ts",   // Path to step definitions
        "hooks/**/*.ts"               // Path to hooks
      ],
      format: [
        "allure-cucumberjs/reporter",
       "json:reports/cucumber-report.json", // JSON report for analysis
       "html:reports/cucumber-report.html"  // HTML report for human-readable output

      ],
      //tags: "@valid or @invalid",  // Run specific tests with tags
      worldParameters: {           // Custom parameters for tests
        baseUrl: "https://opensource-demo.orangehrmlive.com"
      },
      requireModule: ["ts-node/register"], // Enable TypeScript
      timeout: 10000, // Set test timeout (10s)
    },
  };
  