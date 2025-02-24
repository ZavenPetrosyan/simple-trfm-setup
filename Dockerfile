FROM --platform=linux/amd64 public.ecr.aws/docker/library/node:18-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005

RUN npm install -g @nestjs/cli
FROM base AS dev
CMD ["npm", "run", "start:debug"]

FROM base AS production
RUN npm run build
CMD ["npm", "run", "start:prod"]
