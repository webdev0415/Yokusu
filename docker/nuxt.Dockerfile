FROM node:12.18.3-alpine

ENV APP_ROOT /app

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD ./src ${APP_ROOT}

# npm ci
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 5000

# RUN npm run start
CMD [ "npm", "run", "start" ]