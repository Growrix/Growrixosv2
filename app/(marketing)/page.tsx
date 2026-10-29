// Homepage (91-stack.md §3): static (SSG) composition only.
// Sections S1 to S12 are composed here from typed fetchers in lib/cms/* in
// later slices. Never use cookies(), headers() or searchParams here: the route
// must stay static (○) in the `next build` route table.
export default function HomePage() {
  return null;
}
