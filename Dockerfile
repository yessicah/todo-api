FROM node:10

RUN npm install -g pm2
WORKDIR /dist
COPY package.json /dist
RUN npm install
COPY ./ /dist
CMD ["pm2-runtime", "index.js"]