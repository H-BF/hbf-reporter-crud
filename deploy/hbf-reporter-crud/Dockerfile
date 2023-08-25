FROM node:18 as builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18
WORKDIR /usr/src/api_report_crud
COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD ["node", "index.js"]