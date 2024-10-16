import React from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

type DatePickerProps = {
  value?: Date;
  onChange: SelectSingleEventHandler;
  disabled?: boolean;
};

export function DatePicker({ disabled, value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 size-4' />
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar mode='single' selected={value} onSelect={onChange} disabled={disabled} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
