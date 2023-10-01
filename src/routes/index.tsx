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
    <div class={'mx-auto p-4 text-center text-gray-700'}>
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
          class={'rounded border-2 border-black px-2 py-1'}
          type={'text'}
          value={data()}
          onInput={({ currentTarget: { value } }) => setData(value)}
          onKeyUp={({ key }) => {
            if (key === 'Enter' && !helloAdd.isPending && data())
              helloAdd.mutate(data());
          }}
        />
        <button
          class={
            'rounded border-2 border-black bg-gray-300 px-4 transition-all hover:bg-gray-400 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400'
          }
          disabled={helloAdd.isPending || !data()}
          onClick={() => helloAdd.mutate(data())}>
          Submit
        </button>
      </div>
      <br />
      <pre>DrizzleORM + Bun + ElysiaJS + SolidStart + Tailwind CSS</pre>
    </div>
  );
}
