// C-18: inline blocking script in <head>, before first paint.
// 1. `no-js` -> `js` on <html>.
// 2. Theme from localStorage `growrix-os-theme` (`light` | `dark`, fallback
//    light; storage errors fall back to light) (02-tokens.md §1.1).
// 3. `data-motion` tier (pages/home.motion.md §1): `none` under reduced
//    motion; `lite` below 768px, hardwareConcurrency <= 4, deviceMemory <= 4,
//    Save-Data or a 2g/3g connection; otherwise `full`.
// 4. `data-home-top` when the path is `/` (wireframe §4.1.2).
// <html> carries `suppressHydrationWarning` because this script changes its
// attributes before React hydrates.
const SCRIPT = `(function(){var d=document.documentElement,t="light",m="full";d.classList.replace("no-js","js");try{if(localStorage.getItem("growrix-os-theme")==="dark")t="dark"}catch(e){}d.setAttribute("data-theme",t);try{var n=navigator,c=n.connection||{};if(matchMedia("(prefers-reduced-motion: reduce)").matches)m="none";else if(matchMedia("(max-width: 767.98px)").matches||n.hardwareConcurrency<=4||n.deviceMemory<=4||c.saveData||/2g|3g/.test(c.effectiveType||""))m="lite"}catch(e){}d.setAttribute("data-motion",m);if(location.pathname==="/")d.setAttribute("data-home-top","")})()`;

export function HeadBootstrap() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
