FROM node:18-alpine as builder
WORKDIR /usr/src/app
ADD *.json .
ADD ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm ci
ADD . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/hbf_report_crud
COPY --from=builder /usr/src/app/build ./build
ADD *.json .
ADD ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm ci --only=production
CMD ["node", "./build/index.js"]