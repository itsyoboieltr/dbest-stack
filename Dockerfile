FROM oven/bun:latest

ENV NODE_ENV production

WORKDIR /app
COPY . .

RUN bun i
RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
