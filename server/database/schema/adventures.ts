import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const adventures = sqliteTable("adventures", {
  id: text().primaryKey().$defaultFn(() => useHash()),
  name: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export type Adventure = typeof adventures.$inferSelect;
export type AdventureInsert = typeof adventures.$inferInsert;

export default adventures;
