FROM node:22-alpine as builder

WORKDIR /frontend

COPY package*.json ./

RUN rm -rf node_modules package-lock.json && npm install

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /frontend/dist /usr/share/nginx/html

COPY --from=builder /frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]



