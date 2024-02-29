module.exports = {
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': '<rootDir>/__mocks__/styles.module.css',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  // other Jest configuration options...
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};