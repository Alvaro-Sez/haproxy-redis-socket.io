FROM node:13
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
