import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text().primaryKey(),
  username: text().notNull(),
  avatar: text(),
  admin: integer({ mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export default users;
