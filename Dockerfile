# alpineにするとnode-gypで死ぬ
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM caddy:2.1.1-alpine
EXPOSE 80
COPY build/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
