# Adapter skills

This directory grows from your real projects, not from someone else's opinions.

## What an adapter skill is

A one-page cheat sheet for using a specific vendor well. Not a recommendation; just reference. The capability agents (`database-dev`, `auth-dev`, `email-dev`, etc.) read the matching adapter skill when the product's manifest picks that vendor. If no skill exists for a vendor the user picked, the agent reads the vendor's official docs instead and flags the gap for `/retrospective`.

## Shape

```
.claude/skills/adapters/
  database/
    neon.md
    supabase.md
    turso.md
  auth/
    clerk.md
    authjs.md
  email/
    resend.md
    postmark.md
  storage/
    vercel-blob.md
    r2.md
  payments/
    stripe.md
    lemonsqueezy.md
  monitoring/
    sentry.md
  framework/
    nextjs.md
  ui/
    shadcn.md
  animation/
    framer-motion.md
```

One file per vendor per capability. Each file is a SKILL.md with:
- Frontmatter: `name`, `description` (triggers on the capability + provider)
- Env vars the vendor needs
- The port shape the adapter must satisfy
- Common gotchas (connection pooling, webhook signatures, trial handling, etc.)
- Example adapter code

## How this directory grows

**On day one it is empty.** The system has no favored vendor and no reference material. Every project starts cold.

**After each shipped project**, run `/retrospective`. It:
1. Reads the product manifest.
2. For each vendor used, checks if an adapter skill exists.
3. For vendors with no skill, reads what the capability-dev agent learned (final report at `docs/reports/<capability>-dev.md`) and drafts an adapter skill.
4. Shows you the drafts for approval before writing them to disk.

Over a dozen or so projects, the library covers the vendors you actually use. Vendors you've never picked remain absent.

## Writing adapter skills yourself

You can also hand-write one at any time. Use `.claude/templates/adapter-skill.template.md` as the starting shape (will be added when you write the first skill — the template is itself grown from the first retrospective).

## What this directory is NOT

- Not a list of "supported" vendors. The system supports any vendor; adapters just make it faster.
- Not a recommendation. An adapter in `database/supabase.md` doesn't mean "use Supabase." It means "if you pick Supabase, here's what we learned last time."
- Not permanent. Delete an adapter when its advice goes stale. The next project without that skill will refresh it.
