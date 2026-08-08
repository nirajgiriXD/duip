import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "models/**",
      // Upstream shadcn/ui primitives are vendored as-is.
      "components/ui/**",
    ],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
