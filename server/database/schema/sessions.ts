import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import adventures from "./adventures";

export const sessions = sqliteTable("sessions", {
  id: text().primaryKey().$defaultFn(() => useHash()),
  name: text().notNull(),
  adventure: text().references(() => adventures.id, { onDelete: "cascade" }),
  order: integer(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export type Session = typeof sessions.$inferSelect;
export type SessionInsert = typeof sessions.$inferInsert;

export default sessions;
