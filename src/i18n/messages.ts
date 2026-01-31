import type { Lang } from "./languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

export type Messages = typeof ro;

const DICT: Record<Lang, Messages> = { hu, ro, en };

export function getMessages(lang: Lang): Messages {
  return DICT[lang];
}

// t(messages, "home.title")
export function t(messages: Messages, key: string): string {
  const parts = key.split(".");
  let cur: any = messages;
  for (const p of parts) cur = cur?.[p];
  return typeof cur === "string" ? cur : key;
}
