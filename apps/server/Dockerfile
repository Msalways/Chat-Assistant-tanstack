FROM node:23-alpine AS base

WORKDIR /backend

RUN apk add --no-cache openssl git curl && apk upgrade --no-cache

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package.json ./
COPY ./prisma ./prisma
RUN npm install

COPY . .
RUN npm run build

RUN mkdir -p dist/prisma/generated && cp -r prisma/generated/* dist/prisma/generated/

FROM node:23-alpine AS production

WORKDIR /backend

RUN apk add --no-cache curl

COPY --from=base /backend/package.json ./
COPY --from=base /backend/package-lock.json ./
COPY --from=base /backend/dist ./dist
COPY --from=base /backend/prisma ./prisma  

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]

