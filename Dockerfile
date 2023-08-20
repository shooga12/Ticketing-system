FROM node:14

# Create app directory
WORKDIR /ticketing-system

COPY package.json .
RUN npm install
COPY . .
CMD npm start


