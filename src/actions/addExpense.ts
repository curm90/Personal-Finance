"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";

const Expense = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  description: z.string().nullable(),
  notes: z.string().nullable(),
});

export type TExpense = z.infer<typeof Expense>;

export default async function addExpense(
  state: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string } | undefined> {
  const rawFormData = {
    title: formData.get("title"),
    amount: Number(formData.get("amount")),
    description: formData.get("description") || null,
    notes: formData.get("notes") || null,
  };

  const validatedFormData = Expense.safeParse(rawFormData);

  console.log({ validatedFormData: validatedFormData.data });

  if (!validatedFormData.success) {
    console.log({ validatedFormData: validatedFormData.error });
    return { error: "Failed to create expense" };
  }

  try {
    await prisma.expense.create({ data: { ...validatedFormData.data } });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
