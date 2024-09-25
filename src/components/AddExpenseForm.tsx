import Input from "./Input";

export default function AddExpenseForm() {
  return (
    <section className='my-20 flex justify-center'>
      <div className='flex-flex-col'>
        <form className='flex w-full max-w-[800px] flex-col gap-2 rounded-md border border-gray-300 p-8 shadow-lg'>
          <h2 className='text-center text-3xl font-semibold text-gray-900'>Add new expense</h2>
          <div className='my-4 h-[1px] w-full bg-gray-200' />
          <div className='flex gap-2'>
            <Input className='flex-1' type='text' label='Title' />
            <Input className='flex-1' type='number' label='Amount (£)' />
          </div>
          <label className='text-sm font-semibold text-gray-700' htmlFor='descritpion'>
            Description (optional)
          </label>
          <textarea
            name='description'
            cols={1}
            rows={5}
            className='border border-solid border-gray-300 px-6 py-2 font-semibold'
          ></textarea>
          <Input type='text' label='Notes (optional)' />
          <Input type='date' label='Date' className='text-gray-700' />
          <button
            className='mt-4 w-fit rounded-full bg-sky-300 px-6 py-2 text-center font-semibold text-sky-50 transition hover:bg-sky-200'
            type='submit'
          >
            Add Expense
          </button>
        </form>
      </div>
    </section>
  );
}
