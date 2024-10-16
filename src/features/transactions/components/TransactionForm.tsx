import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { insertTransactionsSchema } from '@/db/schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import Select from '@/components/Select';
import { DatePicker } from '@/components/DatePicker';

const formSchema = z.object({
  date: z.date(),
  accountId: z.string(),
  amount: z.string(),
  payee: z.string(),
  notes: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
});

const apiFormSchema = insertTransactionsSchema.omit({ id: true });

export type FormValues = z.infer<typeof formSchema>;
export type ApiFormValues = z.infer<typeof apiFormSchema>;

type TransactionFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  handleCreateAccount: (name: string) => void;
  handleCreateCategory: (name: string) => void;
};

export default function TransactionForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  handleCreateAccount,
  handleCreateCategory,
}: TransactionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleSubmit(values: FormValues) {
    // onSubmit(values);
    console.log({ values });
  }

  function handleDelete() {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form className='space-y-4 pt-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name='date'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker disabled={disabled} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='accountId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  onChange={field.onChange}
                  onCreate={handleCreateAccount}
                  options={accountOptions}
                  placeholder='Select account...'
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='categoryId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose category</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  onChange={field.onChange}
                  onCreate={handleCreateCategory}
                  options={categoryOptions}
                  placeholder='Select a category...'
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='payee'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input placeholder='Add a Payee...' disabled={disabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? 'Save changes' : 'Create account'}
        </Button>
        {!!id && (
          <Button
            variant='outline'
            disabled={disabled}
            type='button'
            className='w-full'
            onClick={handleDelete}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
}
