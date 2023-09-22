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
          'border-2 border-black rounded px-4 bg-red-300 active:bg-red-400 hover:bg-red-400 disabled:bg-red-400 disabled:cursor-not-allowed'
        }
        disabled={helloDelete.isPending}
        onClick={() => helloDelete.mutate(props.id)}>
        X
      </button>
    </div>
  );
}
