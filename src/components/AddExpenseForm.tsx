"use client";

import { useActionState } from "react";
import { Toaster } from "react-hot-toast";
import addExpense from "@/actions/addExpense";
import Input from "./Input";
import FormErrorText from "./FormErrortext";

const initialState = {
  error: "",
};

export default function AddExpenseForm() {
  const [state, action, isPending] = useActionState(addExpense, initialState);
  console.log({ state, isPending });

  return (
    <section className='my-20 flex justify-center'>
      <div className='flex-flex-col'>
        <form
          className='flex w-full max-w-[800px] flex-col gap-2 rounded-md border border-gray-300 p-8 shadow-lg'
          action={action}
        >
          <h2 className='text-center text-3xl font-semibold text-gray-900'>Add new expense</h2>
          <div className='my-4 h-[1px] w-full bg-gray-200' />
          <div className='flex gap-2'>
            <div className='flex flex-col'>
              <Input name='title' className='' type='text' label='Title' />
              {state && state.error && <FormErrorText error={state.error} />}
            </div>
            <div className='flex flex-col'>
              <Input name='amount' className='' type='number' label='Amount (£)' />
              {state && state.error && <FormErrorText error={state.error} />}
            </div>
          </div>
          <label className='text-sm font-semibold text-gray-700' htmlFor='descritpion'>
            Description (optional)
          </label>
          <textarea
            name='description'
            cols={1}
            rows={5}
            className='border border-solid border-gray-300 px-4 py-2 font-semibold'
          ></textarea>
          <Input name='notes' type='text' label='Notes (optional)' />
          <button
            className='mt-4 w-fit rounded-full bg-sky-300 px-6 py-2 text-center font-semibold text-sky-50 transition hover:bg-sky-200'
            type='submit'
          >
            {isPending ? "Loading..." : "Add Expense"}
          </button>
          <Toaster />
        </form>
      </div>
    </section>
  );
}
