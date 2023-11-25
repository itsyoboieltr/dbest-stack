FROM oven/bun:latest

ARG VITE_HOST_URL

WORKDIR /app
COPY . .

RUN bun i
RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
