FROM node:14

WORKDIR /app
COPY . .
RUN npm install && npm run build-ui

EXPOSE 3030
ENTRYPOINT ["node", "src/api"]
