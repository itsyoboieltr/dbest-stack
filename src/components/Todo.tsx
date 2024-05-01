import { createMutation } from '@tanstack/solid-query';
import { api } from '~/app';

interface TodoProps {
  id: string;
  data: string;
}

export default function Todo(props: TodoProps) {
  const todoDelete = createMutation(() => ({
    mutationFn: async () => await api.todo({ id: props.id }).delete(),
  }));
  return (
    <div class={'flex flex-row justify-center gap-4'}>
      <pre>{props.data}</pre>
      <button
        class={
          'rounded border-2 border-black bg-red-300 px-4 transition-all hover:bg-red-400 active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400'
        }
        disabled={todoDelete.isPending}
        onClick={() => todoDelete.mutate()}>
        X
      </button>
    </div>
  );
}
