import { createMutation } from '@tanstack/solid-query';
import { app } from '~/app';
import { handleEden } from '~/utils';

interface HelloProps {
  id: string;
  data: string;
}

export default function Hello(props: HelloProps) {
  const helloDelete = createMutation(() => ({
    mutationFn: async () => handleEden(await app.api.hello[props.id]!.delete()),
  }));
  return (
    <div class={'flex flex-row justify-center gap-4'}>
      <pre>{props.data}</pre>
      <button
        class={
          'rounded border-2 border-black bg-red-300 px-4 transition-all hover:bg-red-400 active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400'
        }
        disabled={helloDelete.isPending}
        onClick={() => helloDelete.mutate()}>
        X
      </button>
    </div>
  );
}
