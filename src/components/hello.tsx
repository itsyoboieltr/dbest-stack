import { createMutation } from '@tanstack/solid-query';
import { app } from '~/root';

interface HelloProps {
  id: string;
  data: string;
}

export default function Hello(props: HelloProps) {
  const helloDelete = createMutation(() => ({
    mutationFn: async (id: string) => {
      const res = await app.api.hello[id].delete();
      if (res.error) throw res.error;
      return res.data;
    },
  }));
  return (
    <div class={'flex flex-row justify-center gap-4'}>
      <pre>{props.data}</pre>
      <button
        class={
          'rounded border-2 border-black bg-red-300 px-4 transition-all hover:bg-red-400 active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400'
        }
        disabled={helloDelete.isPending}
        onClick={() => helloDelete.mutate(props.id)}>
        X
      </button>
    </div>
  );
}
