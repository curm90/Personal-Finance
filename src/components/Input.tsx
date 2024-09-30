import { cn } from "@/lib/utils";

type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
};

export default function Input({
  placeholder,
  type,
  name,
  className,
  required = false,
  label = "",
}: InputProps) {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='text-sm font-semibold text-gray-700'>{label}</label>}
      <input
        className={cn("border border-solid border-gray-300 px-4 py-2 font-semibold", className)}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
    </div>
  );
}
