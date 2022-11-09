const express = require('express')
// Swagger documentation instances
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Routes instances
const profilesRouter = require('./api/routes/profiles.routes');

const app = express()
const port = 10123

// Swagger Jsdoc options
const swaggerJsdocOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'app_update API',
        version: '1.0.0',
      },
    },
    apis: ['./src/api/routes/*.js'], // files containing annotations as above
  };

const openapiSpecification = swaggerJsdoc(swaggerJsdocOptions);

// Swagger UI Express options
const swaggerUiOptions = {
  customSiteTitle: 'app_update',
  customCss: '.topbar { display: none }',
  swaggerOptions: {
      // Disable display of schemas at the bottom of the web page
      defaultModelsExpandDepth: -1,
  },
}

// Use profilesRouter middleware to process requests for the 'profiles/' endpoints
app.use('/profiles', profilesRouter);
// Use swagger middleware to process request for the 'docs/' endpoint. This will show the app_update API documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, swaggerUiOptions));

app.listen(port, () => {
  console.log(`app-update is listening on port ${port}`)
})

module.exports = app; // for testing