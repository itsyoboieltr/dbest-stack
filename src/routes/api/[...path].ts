import { APIEvent } from 'solid-start';
import { app } from '~/server/api';

const handler = async (event: APIEvent) => await app.handle(event.request);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
export const TRACE = handler;
export const CONNECT = handler;
