import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import users from "./users";
import sessions from "./sessions";

export const completions = sqliteTable("completions", {
  id: text().primaryKey().$defaultFn(() => useHash()),
  xp: integer().notNull(),
  gold: integer().notNull(),
  session: text().references(() => sessions.id, { onDelete: "cascade" }),
  user: text().references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export type Completion = typeof completions.$inferSelect;
export type CompletionInsert = typeof completions.$inferInsert;

export default completions;
