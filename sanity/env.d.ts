/**
 * The Studio and the CLI read SANITY_STUDIO_* variables through `process.env`
 * (the Studio build replaces them at build time). @types/node is not a dependency of this
 * workspace, so only the shape used here is declared.
 */
declare const process: {
  env: Record<string, string | undefined>;
};
