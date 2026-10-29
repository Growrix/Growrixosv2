import type { SchemaTypeDefinition } from "sanity";
import { faq, stat, workEntry } from "./documents/content";
import { homePage } from "./documents/homePage";
import { person } from "./documents/person";
import { offer, service } from "./documents/priced";
import { siteSettings } from "./documents/siteSettings";
import { imageWithAlt } from "./objects/imageWithAlt";
import { footerColumn, link, navItem, navLink } from "./objects/link";

/** Singleton document types: one document each, fixed _id = type name. */
export const SINGLETON_TYPES = new Set(["siteSettings", "homePage"]);

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  siteSettings,
  homePage,
  person,
  service,
  offer,
  workEntry,
  faq,
  stat,
  // shared objects
  link,
  navLink,
  navItem,
  footerColumn,
  imageWithAlt,
];
