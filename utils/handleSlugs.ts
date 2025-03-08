import type { PortableTextBlock } from "next-sanity";
import slugify from "slugify";

export function convertToSlug(
  text?: string,
  { fallback }: { fallback?: string } = { fallback: "top-level" },
) {
  if (!text) return fallback;
  return slugify(text.trim(), {
    lower: true,
    remove: /[^a-zA-Z0-9 ]/g,
  });
}

export function parseChildrenToSlug(children: PortableTextBlock["children"]) {
  if (!children) return "";
  return convertToSlug(children.map((child) => child.text).join(""));
}