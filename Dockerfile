# Type: Get Image
# OS: Alpine
# Mengambil image Node versi 21
FROM node:21-alpine

# Default workdir for app services
WORKDIR /app

RUN npm install -g typescript ts-node

COPY package*.json ./

RUN npm install

# COPY project
COPY . .

RUN npm run seed && npm run build

# Publisher port
EXPOSE 3000

# Running Services
CMD [ "node", "build/index.js" ]