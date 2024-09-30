export default function FormErrorText({ error }: { error: string }) {
  return <p className='text-xs text-red-500'>{error}</p>;
}
