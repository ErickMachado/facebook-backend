FROM node

WORKDIR /usr/facebook

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npx", "prisma", "migrate", "dev"]
CMD ["npm", "run", "dev"]
