import { cn } from "@/lib/utils";

type InputProps = {
  placeholder?: string;
  type: string;
  className?: string;
  label?: string;
};

export default function Input({ placeholder, type, className, label = "" }: InputProps) {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='text-sm font-semibold text-gray-700'>{label}</label>}
      <input
        className={cn("border border-solid border-gray-300 px-4 py-2 font-semibold", className)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
