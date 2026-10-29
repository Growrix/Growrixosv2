// C-60: GROQ queries (06-content-schemas.md "Fetching"). One query per page,
// plus one for the root layout. Projections read only the fields 06 lists.
// The client uses the `published` perspective, so references to unpublished
// documents dereference to null; `[defined(@->_id)]` drops them (weak
// `featuredWorkByVariant` refs → published work entries only).

import { defineQuery } from "next-sanity";

const IMAGE = /* groq */ `{
  "asset": asset{ _ref },
  "crop": crop{ top, bottom, left, right },
  "hotspot": hotspot{ x, y, width, height },
  alt,
  decorative
}`;

const LINK = /* groq */ `{ _key, label, href }`;

const SITE_SETTINGS = /* groq */ `*[_id == "siteSettings"][0]{
  brandName,
  oneLiner,
  email,
  "ctas": ctas{
    "fitCall": fitCall{ label, labelShort, labelMobile, href, trackId },
    "teardown": teardown{ label, labelShort, href, trackId },
    "audit": audit{ label, href, trackId },
    "upwork": upwork{ label }
  },
  "navigation": navigation[]{ _key, label, href, "children": children[]${LINK} },
  trustRow,
  timezoneStatement,
  honestProofNote,
  "verifyLinks": verifyLinks[]{ _key, platform, url },
  medianReplySeconds,
  "footer": footer{
    descriptor,
    "columns": columns[]{ _key, heading, "links": links[]${LINK} },
    verifyLabel,
    "legalLinks": legalLinks[]${LINK}
  },
  ui,
  "statusPages": statusPages{
    "notFound": notFound{ heading, body },
    "error": error{ heading, body }
  },
  "concierge": concierge{
    title, subtitle, assistantLabel, intro, starterPrompts, inputLabel,
    inputPlaceholder, sendLabel, pendingText, escalationReply, errorReply,
    noAnswerCue, escalationActions, contactLabel, contactHref, railHeading,
    railBody, rulesHeading, rules
  }
}`;

// `person` is not a singleton in the schema; the seed creates one founder
// document. The oldest published `person` is the founder.
const PERSON = /* groq */ `*[_type == "person"] | order(_createdAt asc)[0]{
  name,
  firstName,
  role,
  location,
  timezone,
  "photo": photo${IMAGE},
  sameAs
}`;

// Every service/offer price, for R-02 tokens (any slug may appear in copy).
const PRICES = /* groq */ `*[_type in ["service", "offer"] && defined(slug.current)]{
  _type,
  "slug": slug.current,
  priceMin,
  priceMax,
  unit
}`;

const PRICE_SOURCE = /* groq */ `{
  _type,
  "slug": slug.current,
  priceMin,
  priceMax,
  unit
}`;

const STAT = /* groq */ `{ _id, value, label, sourceName, sourceUrl, year }`;

// `badge = client` needs `consentOnFile = true` (02 §9.3). Studio enforces it;
// the query repeats it because API writes bypass Studio validation.
const WORK = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  badge,
  cardSummary,
  "thumbnail": loom.thumbnail${IMAGE},
  consentOnFile,
  testRunDescription,
  publishedAt
}`;

const WORK_FILTER = /* groq */ `[defined(@->_id) && (@->badge != "client" || @->consentOnFile == true)]`;

const HERO = /* groq */ `{
  eyebrow, h1, subhead, metaTitle, metaDescription, ogTitle, ogDescription
}`;

const TIMELINE_STEP = /* groq */ `{ _key, time, text }`;

const HOME_PAGE = /* groq */ `*[_id == "homePage"][0]{
  heroVariant,
  "hero": hero{
    "dual": dual${HERO},
    "law": law${HERO},
    "accounting": accounting${HERO}
  },
  "problem": problem{
    heading,
    "statsByVariant": statsByVariant{
      "dual": dual[defined(@->_id)]->${STAT},
      "law": law[defined(@->_id)]->${STAT},
      "accounting": accounting[defined(@->_id)]->${STAT}
    }
  },
  "systems": systems{
    heading,
    "panels": panels[]{
      _key,
      "service": service->{ title, "slug": slug.current, priceMin, priceMax },
      outcome,
      bullets,
      priceLine,
      linkLabel
    }
  },
  "timeline": timeline{
    heading,
    label,
    "byVariant": byVariant{
      "dual": dual[]${TIMELINE_STEP},
      "law": law[]${TIMELINE_STEP},
      "accounting": accounting[]${TIMELINE_STEP}
    }
  },
  "tryIt": tryIt{ heading, body, ctaLabel, ctaHref, smallPrint, medianLine },
  "proof": proof{
    heading,
    sub,
    "featuredWorkByVariant": featuredWorkByVariant{
      "dual": dual${WORK_FILTER}->${WORK},
      "law": law${WORK_FILTER}->${WORK},
      "accounting": accounting${WORK_FILTER}->${WORK}
    },
    allWorkLabel
  },
  "process": process{ heading, "steps": steps[]{ _key, title, body } },
  "pricing": pricing{
    heading,
    "rows": rows[]{
      _key,
      label,
      "source": source[defined(@->_id)]->${PRICE_SOURCE},
      display,
      note
    },
    linkLabel
  },
  "builder": builder{ heading, body, securityList, securityLinkLabel, verifyLabel },
  "agencies": agencies{ body, linkLabel },
  "faq": faq{
    heading,
    "items": items[defined(@->_id)]->{ _id, question, answer }
  },
  "finalCta": finalCta{ heading, body, secondaryLabel, tertiaryLabel }
}`;

/** Homepage: homePage + siteSettings + person + every price document. */
export const HOME_PAGE_QUERY = defineQuery(`{
  "home": ${HOME_PAGE},
  "siteSettings": ${SITE_SETTINGS},
  "person": ${PERSON},
  "prices": ${PRICES}
}`);

/**
 * Root layout: siteSettings + person. Prices are included because
 * `siteSettings.ctas.audit.label` carries an R-02 token.
 */
export const LAYOUT_QUERY = defineQuery(`{
  "siteSettings": ${SITE_SETTINGS},
  "person": ${PERSON},
  "prices": ${PRICES}
}`);
