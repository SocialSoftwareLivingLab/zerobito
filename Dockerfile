# ---------- BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

RUN chown node:node /app

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

COPY package.json yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node . .

RUN yarn build


# ---------- NGINX ----------
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]