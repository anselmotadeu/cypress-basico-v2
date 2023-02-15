const { defineConfig } = require('cypress')

module.exports = defineConfig({
  plungsFile: false,
  viewportHeight: 660,
  viewportWidth: 1000,
  projectId: 'y21tab',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
