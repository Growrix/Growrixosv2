// C-65: joins truthy class strings. No clsx / tailwind-merge (91-stack.md §2).
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
