FROM imbios/bun-node:latest-iron-alpine

ARG VITE_HOST_URL

ENV VITE_HOST_URL=$VITE_HOST_URL

WORKDIR /app
COPY . .

RUN bun i
RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
