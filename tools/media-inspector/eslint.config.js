const browserGlobals = Object.fromEntries([
  "ArrayBuffer", "Blob", "Date", "document", "File", "HTMLElement", "Image", "Intl", "navigator",
  "requestAnimationFrame", "setTimeout", "URL", "Uint8Array", "WeakSet", "window",
  "createImageBitmap",
].map((name) => [name, "readonly"]));

export default [
  { ignores: ["node_modules/**", "vendor/**"] },
  {
    files: ["dist/**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module", globals: browserGlobals },
    rules: {
      "no-constant-condition": "error",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["scripts/**/*.mjs", "tests/**/*.mjs"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module", globals: { console: "readonly", File: "readonly", process: "readonly" } },
    rules: { "no-undef": "error", "no-unreachable": "error", "no-unused-vars": "error" },
  },
];
