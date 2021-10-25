FROM node:16.8
WORKDIR /app/team02
COPY . .
RUN rm -rf node_modules # node_modules will get copied, but this can break between OS differences
RUN npm install
EXPOSE 3000 3000
CMD npm run start:nodemon
