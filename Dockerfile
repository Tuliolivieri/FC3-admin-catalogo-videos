FROM node:20.9.0-alpine3.17

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]