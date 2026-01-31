import type { Lang } from "@/i18n/languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

/**
 * Typed messages store (no `any`)
 * Assumes all language JSON files share the same shape.
 */
export type Messages = typeof hu;

export const MESSAGES = {
  hu,
  ro,
  en,
} as const satisfies Record<Lang, Messages>;

export function getMessages(lang: Lang): Messages {
  return MESSAGES[lang];
}
