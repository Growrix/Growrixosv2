import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// jsx-a11y (U-5): eslint-config-next registers eslint-plugin-jsx-a11y in its
// "next" config object but turns on only 6 of its rules, as warnings.
// The plugin is reused from that object (it is not a direct dependency) and its
// full recommended set is enabled for every file the "next" config covers.
const jsxA11y = nextCoreWebVitals.find((c) => c.plugins?.["jsx-a11y"])?.plugins[
  "jsx-a11y"
];
if (!jsxA11y?.configs?.recommended) {
  throw new Error(
    "eslint-config-next no longer exposes eslint-plugin-jsx-a11y; revisit U-5.",
  );
}

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    name: "growrix/jsx-a11y-recommended",
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      ...jsxA11y.configs.recommended.rules,
      // Keep eslint-config-next's next/image awareness, at error severity.
      "jsx-a11y/alt-text": ["error", { elements: ["img"], img: ["Image"] }],
    },
  },
  {
    // BG-3 / U-4: no hardcoded copy in components. Text children and string
    // expressions in JSX are errors; attribute strings are not checked
    // (ignoreProps), otherwise every className and href would be reported.
    name: "growrix/no-hardcoded-copy",
    files: ["components/**/*.{ts,tsx,js,jsx}"],
    ignores: ["**/*.{test,spec}.{ts,tsx,js,jsx}"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        { noStrings: true, ignoreProps: true, allowedStrings: [] },
      ],
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
      "blob-report/**",
      // Sanity Studio workspace: own package.json and tsconfig (npm run typecheck in sanity/).
      "sanity/**",
    ],
  },
];

export default eslintConfig;
