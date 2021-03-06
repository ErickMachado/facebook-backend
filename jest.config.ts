import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

export default {
  bail: true,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/swagger.json',
    '!<rootDir>/src/utils/logger.ts',
    '!<rootDir>/src/@types/**',
    '!<rootDir>/src/prisma/**',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/email/**',
    '!<rootDir>/src/router/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleDirectories: ['node_modules', 'src/**', 'tests/**'],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  rootDir: '.',
  testEnvironment: 'jest-environment-node',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$']
}
