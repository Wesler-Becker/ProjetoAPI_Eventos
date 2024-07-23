FROM node:16

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm -v

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD ["npm", "run", "full"]
