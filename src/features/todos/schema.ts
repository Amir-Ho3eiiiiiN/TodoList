import { z } from "zod";

export const todoSchema = z.object({
  todo: z.string().min(1, "Todo cannot be empty"),
  completed: z.boolean().default(false),
  userId: z.number().default(1),
});

export type TodoInput = z.infer<typeof todoSchema>;
