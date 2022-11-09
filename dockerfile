# This image is based on node 14.15.4 LTS
FROM node:14.15.4-alpine3.12

# Create application directory
RUN mkdir /home/app-update
WORKDIR /home/app-update

# Install app dependencies (not the devDependencies)
COPY package*.json ./
RUN npm ci --only=production

# Add application source
RUN mkdir ./src
COPY ./src ./src
COPY index.js ./

# Expose the rest api port
EXPOSE 10123/tcp

# Start REST api service
CMD ["node", "index.js"]