module.exports = {
  ...require('./jest.common'),
  displayName: 'server',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/?(*.)+(server-test).[jt]s?(x)'],
};
