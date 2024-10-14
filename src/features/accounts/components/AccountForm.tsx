import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { insertAccountsSchema } from '@/db/schema';

const formSchema = insertAccountsSchema.pick({ name: true });

export type FormValues = z.infer<typeof formSchema>;

type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function AccountForm({ id, defaultValues, onSubmit, onDelete, disabled }: AccountFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleSubmit(values: FormValues) {
    onSubmit(values);
  }

  function handleDelete() {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form className='space-y-4 pt-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder='Account Name' {...field} />
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
