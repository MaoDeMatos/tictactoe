import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",

  roots: ["<rootDir>/src/__tests__"],

  testEnvironment: "jsdom",
};

export default config;
