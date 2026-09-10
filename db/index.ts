import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "./schema";

// The inherited optional example retains its database return type, but this
// independent prototype has no database binding or Cloudflare account access.
export function getDb(): DrizzleD1Database<typeof schema> {
  throw new Error(
    "D1 is disabled in this isolated local prototype. The page does not use a database or remote bindings."
  );
}
