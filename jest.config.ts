import { Config, createConfig } from '@umijs/test';

export default {
  ...createConfig(),
  collectCoverageFrom: ['src/**/*.{ts,js,tsx,jsx}'],
} as Config.InitialOptions;
