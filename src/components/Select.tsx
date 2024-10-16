'use client';

import { useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type SelectProps = {
  options?: { label: string; value: string }[];
  value: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value?: string | null) => void;
  onCreate?: (value: string) => void;
};

export default function Select({
  value,
  disabled,
  placeholder,
  onChange,
  onCreate,
  options = [],
}: SelectProps) {
  const [inputValue, setInputValue] = useState('');

  function handleSelectChange(option: SingleValue<{ label: string; value: string }>) {
    onChange(option?.value);
  }

  const formattedOptions = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      className='h-10 text-sm'
      inputValue={inputValue}
      onInputChange={setInputValue}
      onChange={handleSelectChange}
      onCreateOption={onCreate}
      isDisabled={disabled}
      options={options}
      placeholder={placeholder}
      value={formattedOptions}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: 6,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0',
          },
          boxShadow: 'none',
        }),
      }}
    />
  );
}
