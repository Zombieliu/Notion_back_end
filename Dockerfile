FROM node:16.13.1

ADD package*.json /src/

WORKDIR /src
RUN npm i

# build
ADD . /src
RUN npm run build

# clean
RUN npm prune --production

# move
RUN rm -rf /app \
    && mv dist /app \
    && mv node_modules /app/ \
    && rm -rf /src

# ENV
ENV NODE_ENV production
ENV CLIENTID="1085234510649622548"
ENV TOKEN="MTA4NTIzNDUxMDY0OTYyMjU0OA.Gv0BL8.11c1KxK7CRjEtmF-IFZiVDfUjFHUGnYlRt6HWE"
ENV PORT="3001"

EXPOSE 3000

WORKDIR /app
CMD node index.js
