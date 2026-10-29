import { StatusPageShell } from "@/components/layout/StatusPageShell";
import { getLayoutData } from "@/lib/cms/fetchers";

// 404 (C-26 StatusPageShell, server, static). Renders inside the root layout,
// so the header, footer, #main and skip link are present. Copy comes from
// siteSettings.statusPages.notFound (B-08: still empty → the shell renders
// nothing). The fetch is the same cached call the root layout makes.
export default async function NotFound() {
  const data = await getLayoutData();
  const settings = data?.siteSettings ?? null;
  return (
    <StatusPageShell
      kind="notFound"
      copy={settings?.statusPages.notFound ?? null}
      fitCall={settings?.ctas.fitCall ?? null}
    />
  );
}
