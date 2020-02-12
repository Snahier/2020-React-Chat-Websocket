FROM node:12-alpine

# Work directory
WORKDIR /backend

# Copying dependencies
COPY package.json .

# Installing node dependencies
RUN yarn install

# Copying project
COPY . .

EXPOSE 3333

# Running app
CMD ["yarn", "start"]