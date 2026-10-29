import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { SINGLETON_TYPES, schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

/** Document actions allowed on singletons: no delete, duplicate or unpublish. */
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Growrix OS",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) =>
      templates.filter((t) => !SINGLETON_TYPES.has(t.schemaType)),
  },
  document: {
    actions: (prev, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? prev.filter((a) => a.action !== undefined && SINGLETON_ACTIONS.has(a.action))
        : prev,
    newDocumentOptions: (prev, context) =>
      context.creationContext.type === "global"
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
  },
});
