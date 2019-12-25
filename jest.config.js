module.exports = {
  'globals': {
    'ts-jest': {
      tsConfig: "./tsconfig.test.json"
    }
  },
  preset: 'ts-jest',
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/lib/**",
    "!**/vendor/**"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -20
    }
  },
};
