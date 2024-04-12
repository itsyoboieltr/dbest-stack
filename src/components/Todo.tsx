import { createMutation } from '@tanstack/solid-query';
import { app } from '~/app';

interface TodoProps {
  id: string;
  data: string;
}

export default function Todo(props: TodoProps) {
  const todoDelete = createMutation(() => ({
    mutationFn: async () => await app.api.todo[props.id]?.delete(),
  }));
  return (
    <div class='flex flex-row justify-center gap-4'>
      <pre>{props.data}</pre>
      <button
        type='button'
        class='rounded border-2 border-black bg-red-300 px-4 transition-all hover:bg-red-400 active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400'
        disabled={todoDelete.isPending}
        onClick={() => todoDelete.mutate()}
      >
        X
      </button>
    </div>
  );
}
