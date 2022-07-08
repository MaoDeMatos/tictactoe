import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",

  roots: ["<rootDir>/src/__tests__/src"],

  testEnvironment: "jsdom",
};

export default config;
