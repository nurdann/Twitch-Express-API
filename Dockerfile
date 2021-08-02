FROM node

ENV NODE_ENV=production

WORKDIR /app

COPY . /app/

RUN npm ci
RUN cd momenta-frontend && npm ci && npm run build

CMD ["npm", "start"]