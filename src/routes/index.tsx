import { Value } from '@sinclair/typebox/value';
import { createMutation, createQuery } from '@tanstack/solid-query';
import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { app } from '~/app';
import Hello from '~/components/Hello';
import { helloInsertSchema } from '~/server/routes/hello/schema';
import { validate } from '~/utils';

export default function Home() {
  const [hello, setHello] = createStore(Value.Create(helloInsertSchema));

  const helloQuery = createQuery(() => ({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await app.api.hello.get();
      if (res.error) throw res.error;
      return res.data;
    },
  }));

  const helloAdd = createMutation(() => ({
    mutationFn: async () => {
      const res = await app.api.hello.post(hello);
      if (res.error) throw res.error;
    },
    onSuccess: () => setHello(Value.Create(helloInsertSchema)),
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
          value={hello.data}
          onInput={({ currentTarget: { value: data } }) => setHello({ data })}
          onKeyUp={({ key }) => {
            if (
              key === 'Enter' &&
              !helloAdd.isPending &&
              validate(helloInsertSchema, hello)
            )
              helloAdd.mutate();
          }}
        />
        <button
          class={
            'rounded border-2 border-black bg-gray-300 px-4 transition-all hover:bg-gray-400 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400'
          }
          disabled={helloAdd.isPending || !validate(helloInsertSchema, hello)}
          onClick={() => helloAdd.mutate()}>
          Submit
        </button>
      </div>
      <br />
      <pre>DrizzleORM + Bun + ElysiaJS + SolidStart + Tailwind CSS</pre>
    </div>
  );
}
