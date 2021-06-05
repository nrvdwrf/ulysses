FROM buildkite/puppeteer:5.2.1

WORKDIR /app
COPY . .
RUN npm install --production

EXPOSE 3030
ENTRYPOINT ["node", "src/api"]
