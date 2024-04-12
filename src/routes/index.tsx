import { Create } from '@sinclair/typebox/value';
import { createMutation, createQuery } from '@tanstack/solid-query';
import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { app } from '~/app';
import Todo from '~/components/Todo';
import { todoInsertSchema } from '~/routes/api/todo/schema';
import { validate } from '~/utils';

export default function Home() {
  const [todo, setTodo] = createStore(Create(todoInsertSchema));

  const todoQuery = createQuery(() => ({
    queryKey: ['todo'],
    queryFn: async () => await app.api.todo.get(),
  }));

  const todoAdd = createMutation(() => ({
    mutationFn: async () => await app.api.todo.post(todo),
    onSuccess: () => setTodo(Create(todoInsertSchema)),
  }));

  return (
    <div class='mx-auto p-4 text-center text-gray-700'>
      <Show when={todoQuery.data}>
        {(todoList) => (
          <For each={todoList().data}>
            {(todo) => (
              <div class='mb-2'>
                <Todo id={todo.id} data={todo.data} />
              </div>
            )}
          </For>
        )}
      </Show>
      <br />
      <div class='flex flex-row justify-center gap-4'>
        <input
          class='rounded border-2 border-black px-2 py-1'
          type='text'
          value={todo.data}
          onInput={({ currentTarget: { value: data } }) => setTodo({ data })}
          onKeyUp={({ key }) => {
            if (
              key === 'Enter' &&
              !todoAdd.isPending &&
              validate(todoInsertSchema, todo)
            )
              todoAdd.mutate();
          }}
        />
        <button
          type='button'
          class='rounded border-2 border-black bg-gray-300 px-4 transition-all hover:bg-gray-400 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400'
          disabled={todoAdd.isPending || !validate(todoInsertSchema, todo)}
          onClick={() => todoAdd.mutate()}
        >
          Submit
        </button>
      </div>
      <br />
      <pre>DrizzleORM + Bun + ElysiaJS + SolidStart + Tailwind CSS</pre>
    </div>
  );
}
