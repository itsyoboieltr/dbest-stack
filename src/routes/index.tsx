import { createMutation, createQuery } from '@tanstack/solid-query';
import { For, Show, createSignal } from 'solid-js';
import { app } from '~/root';
import Hello from '~/components/hello';

export default function Home() {
  const [data, setData] = createSignal('');

  const helloQuery = createQuery(() => ({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await app.api.hello.get();
      if (res.error) throw res.error;
      return res.data;
    },
  }));

  const helloAdd = createMutation(() => ({
    mutationFn: async (data: string) => {
      const res = await app.api.hello.post({ data });
      if (res.error) throw res.error;
      return res.data;
    },
    onSuccess: () => setData(''),
  }));

  return (
    <div class={'text-center mx-auto text-gray-700 p-4'}>
      <Show when={helloQuery.data}>
        {(helloList) => (
          <For each={helloList()}>
            {(hello) => (
              <div class={'mb-2'}>
                <Hello id={hello.id} data={hello.data} />
              </div>
            )}
          </For>
        )}
      </Show>
      <br />
      <div class={'flex flex-row justify-center gap-4'}>
        <input
          class={'border-2 border-black rounded px-2 py-1'}
          type={'text'}
          value={data()}
          onInput={({ currentTarget: { value } }) => setData(value)}
        />
        <button
          class={
            'border-2 border-black rounded px-4 bg-gray-300 hover:bg-gray-400 active:bg-gray-400 disabled:bg-gray-400 disabled:cursor-not-allowed'
          }
          disabled={helloAdd.isPending || !data()}
          onClick={() => helloAdd.mutate(data())}>
          Submit
        </button>
      </div>
      <br />
      <pre>SolidStart + ElysiaJS + Tailwind CSS + DrizzleORM</pre>
    </div>
  );
}
