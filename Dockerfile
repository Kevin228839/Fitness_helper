FROM node:18

WORKDIR /myapp

COPY . .

RUN (cd /myapp/frontend && npm install) && (cd /myapp/server && npm install) && (npm install nodemon -g)

ENTRYPOINT (cd /myapp/frontend && npm run build) && (cd /myapp/server && nodemon ./index.js)