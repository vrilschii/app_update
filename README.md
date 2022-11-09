# app-update service

Description
========================================

This service is used by the music players to check whether there is a new version of one of their compmonents.
 
The service holds a list of players in an .csv file. A player's mac-address is used as the client Id. So when the player sends a GET request to check if there is an update, it should provide its mac-address as 'x-client-id' header parameter. The server will check whether there is a client with the provided Id (mac-address) and will send him the actual versions of different components/applications. Also a player should provide the authentication token as 'x-authentication-token'. The server will check whether the token is valid and not expired (not implemented).

To install node and dependencies
========================================

# To install node
https://nodejs.org/en/download/

# To download all dependencies:
npm install

To run service on localhost
========================================

# To run the service:
npm start

# The service will now be listening on the port 10123

# To get API description
http://localhost:10123/docs

# To run automatic tests:
npm test

# To test API entirely
Use Postman (collection file: '/test/Profiles.postman_collection.json')

Using Docker:
========================================

# Build 'app-update' image
docker build -t app-update:1.0 .

# Create and run 'app-update' container
docker run -d -p 10123:10123 --name app-update app-update:1.0

# The service will now be listening on the port 10123

# To get API description
http://localhost:10123/docs

# To run automatic tests:
npm test

# To test API entirely
Use Postman (collection file: '/test/Profiles.postman_collection.json')