import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    clerkUserId: varchar("clerk_user_id", { length: 255 }).unique().notNull(),

    // User information from Clerk
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email").notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      clerkUserIdIdx: index("clerk_user_id_idx").on(users.clerkUserId),
    };
  }
);

// Types for use in your application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userInsertSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users);