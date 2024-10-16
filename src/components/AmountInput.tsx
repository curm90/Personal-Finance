import CurrencyInput from 'react-currency-input-field';
import { Info, MinusCircle, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AmountInputProps = {
  value: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function AmountInput({ value, onChange, disabled, placeholder }: AmountInputProps) {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  function handleReverseValue() {
    if (!value) return;

    onChange((parsedValue * -1).toString());
  }

  return (
    <div className='relative'>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type='button'
              onClick={handleReverseValue}
              className={cn(
                'transtion absolute left-1.5 top-[0.27rem] flex items-center justify-center rounded-md bg-slate-400 p-2 hover:bg-slate-500',
                isIncome ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-rose-400 hover:bg-rose-500'
              )}
            >
              {!parsedValue && <Info className='size-3 text-white' />}
              {isIncome && <PlusCircle className='size-3 text-white' />}
              {isExpense && <MinusCircle className='size-3 text-white' />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Use [+] for income and [-] for expenses</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix='$'
        className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        decimalsLimit={2}
        placeholder={placeholder}
        decimalScale={2}
      />
      <p className='mt-2 text-xs text-muted-foreground'>
        {isIncome ? 'This will count as income' : 'This will count as an expense'}
      </p>
    </div>
  );
}
