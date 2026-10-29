export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined };

export type JsonLdProps = {
  data: { [key: string]: JsonLdValue | undefined };
};

/**
 * C-08 (server): renders `<script type="application/ld+json">`.
 * Every `<` in the serialised JSON is replaced with the six-character escape
 * `\u003c`, so no CMS string can close the script tag (QA F-12). The result
 * is still valid JSON.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data);
  if (!json) return null;
  // LT_ESCAPE = the six characters: backslash, u, 0, 0, 3, c.
  const LT_ESCAPE = "\\u003c";
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, LT_ESCAPE) }}
    />
  );
}
